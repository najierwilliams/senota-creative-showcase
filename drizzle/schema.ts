import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "employee", "circle", "admin"]).default("user").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  city: varchar("city", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Customer: Digital Magazine Library ──────────────────────────────────────

export const digitalMagazines = mysqlTable("digital_magazines", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  issueNumber: int("issueNumber").notNull(),
  coverUrl: text("coverUrl"),
  fileKey: text("fileKey"),
  fileUrl: text("fileUrl"),
  description: text("description"),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userMagazines = mysqlTable("user_magazines", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  magazineId: int("magazineId").notNull(),
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  downloadCount: int("downloadCount").default(0).notNull(),
  lastDownloadedAt: timestamp("lastDownloadedAt"),
});

// ─── Customer: Course Enrollments ────────────────────────────────────────────

export const courseEnrollments = mysqlTable("course_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: varchar("courseId", { length: 64 }).notNull(),
  courseName: varchar("courseName", { length: 256 }).notNull(),
  status: mysqlEnum("status", ["pending", "active", "completed", "paused"]).default("pending").notNull(),
  progress: int("progress").default(0).notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
});

// ─── Employee: Training & Announcements ──────────────────────────────────────

export const trainingModules = mysqlTable("training_modules", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  estimatedMinutes: int("estimatedMinutes").default(30).notNull(),
  content: text("content"),
  order: int("order").default(0).notNull(),
  isRequired: boolean("isRequired").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const employeeTrainingProgress = mysqlTable("employee_training_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started").notNull(),
  completedAt: timestamp("completedAt"),
  score: int("score"),
});

export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", ["general", "urgent", "event", "policy"]).default("general").notNull(),
  targetRole: mysqlEnum("targetRole", ["all", "employee", "circle", "admin"]).default("all").notNull(),
  authorId: int("authorId"),
  isPinned: boolean("isPinned").default(false).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── The Circle: VIP Community ───────────────────────────────────────────────

export const circleEvents = mysqlTable("circle_events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 256 }),
  isVirtual: boolean("isVirtual").default(false).notNull(),
  coverUrl: text("coverUrl"),
  eventDate: timestamp("eventDate").notNull(),
  rsvpDeadline: timestamp("rsvpDeadline"),
  maxAttendees: int("maxAttendees"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circleEventRsvps = mysqlTable("circle_event_rsvps", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  eventId: int("eventId").notNull(),
  status: mysqlEnum("status", ["going", "maybe", "not_going"]).default("going").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circlePerks = mysqlTable("circle_perks", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  code: varchar("code", { length: 64 }),
  expiresAt: timestamp("expiresAt"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const circlePosts = mysqlTable("circle_posts", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  likes: int("likes").default(0).notNull(),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const circlePostLikes = mysqlTable("circle_post_likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});