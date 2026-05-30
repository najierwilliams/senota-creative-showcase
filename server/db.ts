import { drizzle } from "drizzle-orm/neon-serverless";
import {
  InsertUser,
  announcements,
  circleEventRsvps,
  circleEvents,
  circlePerks,
  circlePostLikes,
  circlePosts,
  courseEnrollments,
  digitalMagazines,
  employeeTrainingProgress,
  trainingModules,
  userMagazines,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { eq, and, sql } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  try {
    const values: InsertUser = {
      openId: user.openId,
      name: user.name ?? null,
      email: user.email ?? null,
      loginMethod: user.loginMethod ?? "clerk",
      lastSignedIn: user.lastSignedIn ?? new Date(),
      role: user.role ?? "user",
    };

    if (user.openId === ENV.ownerOpenId) values.role = "admin";

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: values.name,
        email: values.email,
        loginMethod: values.loginMethod,
        lastSignedIn: values.lastSignedIn,
        role: values.role,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function updateUserProfile(id: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.id, id));
}

export async function setUserRole(id: number, role: any) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ role }).where(eq(users.id, id));
}

// ─── Customer ─────────────────────────────────────────────────────────────────

export async function getUserMagazines(userId: number) {
  const db = await getDb();
  if (!db) return [];
  // Join userMagazines with digitalMagazines to include downloadCount and magazineId
  const rows = await db
    .select({
      id: digitalMagazines.id,
      magazineId: userMagazines.magazineId,
      title: digitalMagazines.title,
      issueNumber: digitalMagazines.issueNumber,
      coverUrl: digitalMagazines.coverUrl,
      fileKey: digitalMagazines.fileKey,
      fileUrl: digitalMagazines.fileUrl,
      description: digitalMagazines.description,
      publishedAt: digitalMagazines.publishedAt,
      downloadCount: userMagazines.downloadCount,
      purchasedAt: userMagazines.purchasedAt,
    })
    .from(userMagazines)
    .innerJoin(digitalMagazines, eq(userMagazines.magazineId, digitalMagazines.id))
    .where(eq(userMagazines.userId, userId));
  return rows;
}

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(courseEnrollments).where(eq(courseEnrollments.userId, userId));
}

export async function incrementDownloadCount(userId: number, magazineId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(userMagazines).set({ 
    downloadCount: sql`${userMagazines.downloadCount} + 1`,
    lastDownloadedAt: new Date()
  }).where(and(eq(userMagazines.userId, userId), eq(userMagazines.magazineId, magazineId)));
}

export async function updateEnrollmentProgress(id: number, userId: number, data: any) {
  const db = await getDb();
  if (!db) return;
  await db.update(courseEnrollments).set(data).where(and(eq(courseEnrollments.id, id), eq(courseEnrollments.userId, userId)));
}

// ─── Employee ─────────────────────────────────────────────────────────────────

export async function getTrainingModules() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(trainingModules).orderBy(trainingModules.order);
}

export async function getEmployeeProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  // Join employeeTrainingProgress with trainingModules to include module details
  const rows = await db
    .select({
      id: employeeTrainingProgress.id,
      userId: employeeTrainingProgress.userId,
      moduleId: employeeTrainingProgress.moduleId,
      status: employeeTrainingProgress.status,
      completedAt: employeeTrainingProgress.completedAt,
      score: employeeTrainingProgress.score,
      title: trainingModules.title,
      description: trainingModules.description,
      category: trainingModules.category,
      estimatedMinutes: trainingModules.estimatedMinutes,
      content: trainingModules.content,
      order: trainingModules.order,
      isRequired: trainingModules.isRequired,
    })
    .from(employeeTrainingProgress)
    .innerJoin(trainingModules, eq(employeeTrainingProgress.moduleId, trainingModules.id))
    .where(eq(employeeTrainingProgress.userId, userId));
  return rows;
}

export async function markModuleComplete(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(employeeTrainingProgress).values({
    userId, moduleId, status: "completed", completedAt: new Date()
  }).onConflictDoUpdate({
    target: [employeeTrainingProgress.userId, employeeTrainingProgress.moduleId],
    set: { status: "completed", completedAt: new Date() }
  });
}

export async function markModuleInProgress(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(employeeTrainingProgress).values({
    userId, moduleId, status: "in_progress"
  }).onConflictDoUpdate({
    target: [employeeTrainingProgress.userId, employeeTrainingProgress.moduleId],
    set: { status: "in_progress" }
  });
}

export async function getAnnouncements(role: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(announcements).orderBy(announcements.createdAt);
}

// ─── Circle ───────────────────────────────────────────────────────────────────

export async function getCirclePosts() {
  const db = await getDb();
  if (!db) return [];
  // Join circlePosts with users to include authorName and authorAvatar
  const rows = await db
    .select({
      id: circlePosts.id,
      authorId: circlePosts.authorId,
      content: circlePosts.content,
      imageUrl: circlePosts.imageUrl,
      likes: circlePosts.likes,
      isPinned: circlePosts.isPinned,
      createdAt: circlePosts.createdAt,
      updatedAt: circlePosts.updatedAt,
      authorName: users.name,
      authorAvatar: users.avatar,
    })
    .from(circlePosts)
    .leftJoin(users, eq(circlePosts.authorId, users.id))
    .orderBy(circlePosts.createdAt);
  return rows;
}

export async function getUserLikedPosts(userId: number) {
  const db = await getDb();
  if (!db) return [] as number[];
  // Return just the postId numbers so the client can do likedPostIds.includes(post.id)
  const rows = await db
    .select({ postId: circlePostLikes.postId })
    .from(circlePostLikes)
    .where(eq(circlePostLikes.userId, userId));
  return rows.map((r) => r.postId);
}

export async function createCirclePost(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(circlePosts).values(data);
}

export async function likePost(userId: number, postId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(circlePostLikes).values({ userId, postId });
}

export async function getCircleEvents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(circleEvents).orderBy(circleEvents.eventDate);
}

export async function getUserRsvps(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(circleEventRsvps).where(eq(circleEventRsvps.userId, userId));
}

export async function upsertRsvp(userId: number, eventId: number, status: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(circleEventRsvps).values({ userId, eventId, status }).onConflictDoUpdate({
    target: [circleEventRsvps.userId, circleEventRsvps.eventId],
    set: { status }
  });
}

export async function getCirclePerks() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(circlePerks).where(eq(circlePerks.isActive, true));
}

// Missing Admin functions
export async function createAnnouncement(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(announcements).values(data);
}

export async function createCircleEvent(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(circleEvents).values(data);
}

export async function createCirclePerk(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(circlePerks).values(data);
}

export async function createEnrollment(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(courseEnrollments).values(data);
}

export async function createMagazine(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(digitalMagazines).values(data);
}

export async function createTrainingModule(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(trainingModules).values(data);
}

export async function getAllMagazines() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(digitalMagazines);
}
