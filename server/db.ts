import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
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

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(
  id: number,
  data: { name?: string; bio?: string; city?: string; avatar?: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set(data).where(eq(users.id, id));
}

export async function setUserRole(
  id: number,
  role: "user" | "employee" | "circle" | "admin"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ role }).where(eq(users.id, id));
}

// ─── Customer: Digital Magazines ─────────────────────────────────────────────

export async function getAllMagazines() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(digitalMagazines).orderBy(desc(digitalMagazines.issueNumber));
}

export async function getUserMagazines(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      id: userMagazines.id,
      purchasedAt: userMagazines.purchasedAt,
      downloadCount: userMagazines.downloadCount,
      lastDownloadedAt: userMagazines.lastDownloadedAt,
      magazineId: digitalMagazines.id,
      title: digitalMagazines.title,
      issueNumber: digitalMagazines.issueNumber,
      coverUrl: digitalMagazines.coverUrl,
      fileUrl: digitalMagazines.fileUrl,
      description: digitalMagazines.description,
      publishedAt: digitalMagazines.publishedAt,
    })
    .from(userMagazines)
    .innerJoin(digitalMagazines, eq(userMagazines.magazineId, digitalMagazines.id))
    .where(eq(userMagazines.userId, userId))
    .orderBy(desc(digitalMagazines.issueNumber));
  return rows;
}

export async function incrementDownloadCount(userId: number, magazineId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select()
    .from(userMagazines)
    .where(
      and(eq(userMagazines.userId, userId), eq(userMagazines.magazineId, magazineId))
    )
    .limit(1);
  if (rows.length === 0) throw new Error("Magazine not found in user library");
  await db
    .update(userMagazines)
    .set({
      downloadCount: rows[0].downloadCount + 1,
      lastDownloadedAt: new Date(),
    })
    .where(eq(userMagazines.id, rows[0].id));
}

export async function createMagazine(data: {
  title: string;
  issueNumber: number;
  coverUrl?: string;
  fileKey?: string;
  fileUrl?: string;
  description?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(digitalMagazines).values(data);
}

// ─── Customer: Course Enrollments ────────────────────────────────────────────

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(courseEnrollments)
    .where(eq(courseEnrollments.userId, userId))
    .orderBy(desc(courseEnrollments.enrolledAt));
}

export async function createEnrollment(data: {
  userId: number;
  courseId: string;
  courseName: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(courseEnrollments).values(data);
}

export async function updateEnrollmentProgress(
  id: number,
  userId: number,
  data: { progress?: number; status?: "pending" | "active" | "completed" | "paused" }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(courseEnrollments)
    .set(data)
    .where(and(eq(courseEnrollments.id, id), eq(courseEnrollments.userId, userId)));
}

// ─── Employee: Training Modules ──────────────────────────────────────────────

export async function getTrainingModules() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trainingModules).orderBy(trainingModules.order);
}

export async function createTrainingModule(data: {
  title: string;
  description?: string;
  category: string;
  estimatedMinutes?: number;
  content?: string;
  order?: number;
  isRequired?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(trainingModules).values(data);
}

export async function getEmployeeProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      progressId: employeeTrainingProgress.id,
      status: employeeTrainingProgress.status,
      completedAt: employeeTrainingProgress.completedAt,
      score: employeeTrainingProgress.score,
      moduleId: trainingModules.id,
      title: trainingModules.title,
      description: trainingModules.description,
      category: trainingModules.category,
      estimatedMinutes: trainingModules.estimatedMinutes,
      content: trainingModules.content,
      order: trainingModules.order,
      isRequired: trainingModules.isRequired,
    })
    .from(trainingModules)
    .leftJoin(
      employeeTrainingProgress,
      and(
        eq(employeeTrainingProgress.moduleId, trainingModules.id),
        eq(employeeTrainingProgress.userId, userId)
      )
    )
    .orderBy(trainingModules.order);
  return rows;
}

export async function markModuleComplete(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Upsert progress row
  const existing = await db
    .select()
    .from(employeeTrainingProgress)
    .where(
      and(
        eq(employeeTrainingProgress.userId, userId),
        eq(employeeTrainingProgress.moduleId, moduleId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(employeeTrainingProgress)
      .set({ status: "completed", completedAt: new Date() })
      .where(eq(employeeTrainingProgress.id, existing[0].id));
  } else {
    await db
      .insert(employeeTrainingProgress)
      .values({ userId, moduleId, status: "completed", completedAt: new Date() });
  }
}

export async function markModuleInProgress(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(employeeTrainingProgress)
    .where(
      and(
        eq(employeeTrainingProgress.userId, userId),
        eq(employeeTrainingProgress.moduleId, moduleId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    if (existing[0].status !== "completed") {
      await db
        .update(employeeTrainingProgress)
        .set({ status: "in_progress" })
        .where(eq(employeeTrainingProgress.id, existing[0].id));
    }
  } else {
    await db
      .insert(employeeTrainingProgress)
      .values({ userId, moduleId, status: "in_progress" });
  }
}

// ─── Announcements ────────────────────────────────────────────────────────────

export async function getAnnouncements(
  targetRole: "all" | "employee" | "circle" | "admin" = "all"
) {
  const db = await getDb();
  if (!db) return [];
  // Return announcements targeted at "all" or the specific role
  const rows = await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.isPinned), desc(announcements.createdAt));
  return rows.filter(
    (a) => a.targetRole === "all" || a.targetRole === targetRole
  );
}

export async function createAnnouncement(data: {
  title: string;
  content: string;
  category?: "general" | "urgent" | "event" | "policy";
  targetRole?: "all" | "employee" | "circle" | "admin";
  authorId?: number;
  isPinned?: boolean;
  expiresAt?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(announcements).values(data);
}

// ─── Circle: Events ───────────────────────────────────────────────────────────

export async function getCircleEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(circleEvents).orderBy(circleEvents.eventDate);
}

export async function createCircleEvent(data: {
  title: string;
  description?: string;
  location?: string;
  isVirtual?: boolean;
  coverUrl?: string;
  eventDate: Date;
  rsvpDeadline?: Date;
  maxAttendees?: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(circleEvents).values(data);
}

export async function getUserRsvps(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(circleEventRsvps)
    .where(eq(circleEventRsvps.userId, userId));
}

export async function upsertRsvp(
  userId: number,
  eventId: number,
  status: "going" | "maybe" | "not_going"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(circleEventRsvps)
    .where(
      and(
        eq(circleEventRsvps.userId, userId),
        eq(circleEventRsvps.eventId, eventId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(circleEventRsvps)
      .set({ status })
      .where(eq(circleEventRsvps.id, existing[0].id));
  } else {
    await db.insert(circleEventRsvps).values({ userId, eventId, status });
  }
}

// ─── Circle: Perks ────────────────────────────────────────────────────────────

export async function getCirclePerks() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(circlePerks)
    .where(eq(circlePerks.isActive, true))
    .orderBy(desc(circlePerks.createdAt));
}

export async function createCirclePerk(data: {
  title: string;
  description?: string;
  category: string;
  code?: string;
  expiresAt?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(circlePerks).values(data);
}

// ─── Circle: Community Posts ──────────────────────────────────────────────────

export async function getCirclePosts() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      id: circlePosts.id,
      content: circlePosts.content,
      imageUrl: circlePosts.imageUrl,
      likes: circlePosts.likes,
      isPinned: circlePosts.isPinned,
      createdAt: circlePosts.createdAt,
      authorId: circlePosts.authorId,
      authorName: users.name,
      authorAvatar: users.avatar,
    })
    .from(circlePosts)
    .innerJoin(users, eq(circlePosts.authorId, users.id))
    .orderBy(desc(circlePosts.isPinned), desc(circlePosts.createdAt));
  return rows;
}

export async function createCirclePost(data: {
  authorId: number;
  content: string;
  imageUrl?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(circlePosts).values(data);
}

export async function likePost(userId: number, postId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if already liked
  const existing = await db
    .select()
    .from(circlePostLikes)
    .where(
      and(eq(circlePostLikes.userId, userId), eq(circlePostLikes.postId, postId))
    )
    .limit(1);

  if (existing.length > 0) {
    // Unlike
    await db
      .delete(circlePostLikes)
      .where(eq(circlePostLikes.id, existing[0].id));
    // Decrement
    const post = await db
      .select()
      .from(circlePosts)
      .where(eq(circlePosts.id, postId))
      .limit(1);
    if (post.length > 0) {
      await db
        .update(circlePosts)
        .set({ likes: Math.max(0, post[0].likes - 1) })
        .where(eq(circlePosts.id, postId));
    }
    return { liked: false };
  } else {
    // Like
    await db.insert(circlePostLikes).values({ userId, postId });
    const post = await db
      .select()
      .from(circlePosts)
      .where(eq(circlePosts.id, postId))
      .limit(1);
    if (post.length > 0) {
      await db
        .update(circlePosts)
        .set({ likes: post[0].likes + 1 })
        .where(eq(circlePosts.id, postId));
    }
    return { liked: true };
  }
}

export async function getUserLikedPosts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({ postId: circlePostLikes.postId })
    .from(circlePostLikes)
    .where(eq(circlePostLikes.userId, userId));
  return rows.map((r) => r.postId);
}
