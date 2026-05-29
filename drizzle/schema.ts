import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 */
export const roleEnum = pgEnum("role", ["user", "employee", "circle", "admin"]);
export const courseStatusEnum = pgEnum("status", ["pending", "active", "completed", "paused"]);
export const announcementCategoryEnum = pgEnum("announcement_category", ["general", "urgent", "event", "policy"]);
export const targetRoleEnum = pgEnum("target_role", ["all", "employee", "circle", "admin"]);
export const rsvpStatusEnum = pgEnum("rsvp_status", ["going", "maybe", "not_going"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  city: varchar("city", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Customer: Digital Magazine Library ──────────────────────────────────────

export const digitalMagazines = pgTable("digital_magazines", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  issueNumber: integer("issueNumber").notNull(),
  coverUrl: text("coverUrl"),
  fileKey: text("fileKey"),
  fileUrl: text("fileUrl"),
  description: text("description"),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userMagazines = pgTable("user_magazines", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  magazineId: integer("magazineId").notNull(),
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  downloadCount: integer("downloadCount").default(0).notNull(),
  lastDownloadedAt: timestamp("lastDownloadedAt"),
});

// ─── Customer: Course Enrollments ────────────────────────────────────────────

export const courseEnrollments = pgTable("course_enrollments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  courseId: varchar("courseId", { length: 64 }).notNull(),
  courseName: varchar("courseName", { length: 256 }).notNull(),
  status: courseStatusEnum("status").default("pending").notNull(),
  progress: integer("progress").default(0).notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
});

// ─── Employee: Training & Announcements ──────────────────────────────────────

export const trainingModules = pgTable("training_modules", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  estimatedMinutes: integer("estimatedMinutes").default(30).notNull(),
  content: text("content"),
  order: integer("order").default(0).notNull(),
  isRequired: boolean("isRequired").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const trainingStatusEnum = pgEnum("training_status", ["not_started", "in_progress", "completed"]);

export const employeeTrainingProgress = pgTable("employee_training_progress", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  moduleId: integer("moduleId").notNull(),
  status: trainingStatusEnum("status").default("not_started").notNull(),
  completedAt: timestamp("completedAt"),
  score: integer("score"),
});

export const announcements = pgTable("announcements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  category: announcementCategoryEnum("category").default("general").notNull(),
  targetRole: targetRoleEnum("targetRole").default("all").notNull(),
  authorId: integer("authorId"),
  isPinned: boolean("isPinned").default(false).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── The Circle: VIP Community ───────────────────────────────────────────────

export const circleEvents = pgTable("circle_events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 256 }),
  isVirtual: boolean("isVirtual").default(false).notNull(),
  coverUrl: text("coverUrl"),
  eventDate: timestamp("eventDate").notNull(),
  rsvpDeadline: timestamp("rsvpDeadline"),
  maxAttendees: integer("maxAttendees"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circleEventRsvps = pgTable("circle_event_rsvps", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  eventId: integer("eventId").notNull(),
  status: rsvpStatusEnum("status").default("going").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circlePerks = pgTable("circle_perks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  code: varchar("code", { length: 64 }),
  expiresAt: timestamp("expiresAt"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circlePosts = pgTable("circle_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  authorId: integer("authorId").notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  likes: integer("likes").default(0).notNull(),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const circlePostLikes = pgTable("circle_post_likes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  postId: integer("postId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
