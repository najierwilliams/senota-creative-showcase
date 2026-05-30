import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createAnnouncement,
  createCircleEvent,
  createCirclePerk,
  createCirclePost,
  createEnrollment,
  createMagazine,
  createTrainingModule,
  getAllMagazines,
  getAnnouncements,
  getCircleEvents,
  getCirclePerks,
  getCirclePosts,
  getEmployeeProgress,
  getTrainingModules,
  getUserEnrollments,
  getUserLikedPosts,
  getUserMagazines,
  getUserRsvps,
  incrementDownloadCount,
  likePost,
  markModuleComplete,
  markModuleInProgress,
  setUserRole,
  updateEnrollmentProgress,
  updateUserProfile,
  upsertRsvp,
} from "./db";

// ─── Role guards ──────────────────────────────────────────────────────────────

const employeeProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "employee" && ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Employee access required" });
  }
  return next({ ctx });
});

const circleProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "circle" && ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Circle VIP access required" });
  }
  return next({ ctx });
});

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── App Router ───────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,

  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query(async ({ ctx }) => {
      // If we have a userId but the user object is missing or we want to force sync,
      // we can do it here. For now, we rely on the context's already synced user.
      return ctx.user;
    }),
    refresh: protectedProcedure.mutation(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ 
          code: "UNAUTHORIZED", 
          message: "Server could not identify your session. Please sign out and back in." 
        });
      }
      return { success: true, user: ctx.user };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Customer Dashboard ────────────────────────────────────────────────────
  dashboard: router({
    getMyMagazines: protectedProcedure.query(({ ctx }) =>
      getUserMagazines(ctx.user.id)
    ),

    downloadMagazine: protectedProcedure
      .input(z.object({ magazineId: z.number() }))
      .mutation(({ ctx, input }) =>
        incrementDownloadCount(ctx.user.id, input.magazineId)
      ),

    getMyEnrollments: protectedProcedure.query(({ ctx }) =>
      getUserEnrollments(ctx.user.id)
    ),

    updateEnrollmentProgress: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          progress: z.number().min(0).max(100).optional(),
          status: z
            .enum(["pending", "active", "completed", "paused"])
            .optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        updateEnrollmentProgress(input.id, ctx.user.id, {
          progress: input.progress,
          status: input.status,
        })
      ),

    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128).optional(),
          bio: z.string().max(500).optional(),
          city: z.string().max(128).optional(),
          avatar: z.string().url().optional(),
        })
      )
      .mutation(({ ctx, input }) => updateUserProfile(ctx.user.id, input)),
  }),

  // ── Employee Dashboard ────────────────────────────────────────────────────
  employee: router({
    getTrainingModules: employeeProcedure.query(() => getTrainingModules()),

    getMyProgress: employeeProcedure.query(({ ctx }) =>
      getEmployeeProgress(ctx.user.id)
    ),

    markModuleComplete: employeeProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(({ ctx, input }) =>
        markModuleComplete(ctx.user.id, input.moduleId)
      ),

    markModuleInProgress: employeeProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(({ ctx, input }) =>
        markModuleInProgress(ctx.user.id, input.moduleId)
      ),

    getAnnouncements: employeeProcedure.query(() =>
      getAnnouncements("employee")
    ),
  }),

  // ── The Circle VIP Dashboard ──────────────────────────────────────────────
  circle: router({
    getPosts: circleProcedure.query(() => getCirclePosts()),

    getMyLikedPosts: circleProcedure.query(({ ctx }) =>
      getUserLikedPosts(ctx.user.id)
    ),

    createPost: circleProcedure
      .input(
        z.object({
          content: z.string().min(1).max(2000),
          imageUrl: z.string().url().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createCirclePost({ authorId: ctx.user.id, ...input })
      ),

    likePost: circleProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(({ ctx, input }) => likePost(ctx.user.id, input.postId)),

    getEvents: circleProcedure.query(() => getCircleEvents()),

    getUserRsvps: circleProcedure.query(({ ctx }) =>
      getUserRsvps(ctx.user.id)
    ),

    rsvpEvent: circleProcedure
      .input(
        z.object({
          eventId: z.number(),
          status: z.enum(["going", "maybe", "not_going"]),
        })
      )
      .mutation(({ ctx, input }) =>
        upsertRsvp(ctx.user.id, input.eventId, input.status)
      ),

    getPerks: circleProcedure.query(() => getCirclePerks()),

    getAnnouncements: circleProcedure.query(() =>
      getAnnouncements("circle")
    ),
  }),

  // ── Admin ─────────────────────────────────────────────────────────────────
  admin: router({
    setUserRole: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          role: z.enum(["user", "employee", "circle", "admin"]),
        })
      )
      .mutation(({ input }) => setUserRole(input.userId, input.role)),

    createAnnouncement: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          content: z.string().min(1),
          category: z
            .enum(["general", "urgent", "event", "policy"])
            .optional(),
          targetRole: z
            .enum(["all", "employee", "circle", "admin"])
            .optional(),
          isPinned: z.boolean().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createAnnouncement({ ...input, authorId: ctx.user.id })
      ),

    createMagazine: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          issueNumber: z.number().int().positive(),
          coverUrl: z.string().url().optional(),
          fileKey: z.string().optional(),
          fileUrl: z.string().url().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(({ input }) => createMagazine(input)),

    createTrainingModule: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          description: z.string().optional(),
          category: z.string().min(1).max(64),
          estimatedMinutes: z.number().int().positive().optional(),
          content: z.string().optional(),
          order: z.number().int().optional(),
          isRequired: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => createTrainingModule(input)),

    createCircleEvent: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          description: z.string().optional(),
          location: z.string().max(256).optional(),
          isVirtual: z.boolean().optional(),
          coverUrl: z.string().url().optional(),
          eventDate: z.date(),
          rsvpDeadline: z.date().optional(),
          maxAttendees: z.number().int().positive().optional(),
        })
      )
      .mutation(({ input }) => createCircleEvent(input)),

    createCirclePerk: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          description: z.string().optional(),
          category: z.string().min(1).max(64),
          code: z.string().max(64).optional(),
          expiresAt: z.date().optional(),
        })
      )
      .mutation(({ input }) => createCirclePerk(input)),

    getAllMagazines: adminProcedure.query(() => getAllMagazines()),
  }),
});

export type AppRouter = typeof appRouter;
