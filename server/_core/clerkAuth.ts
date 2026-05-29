import { clerkClient } from "@clerk/express";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";

/**
 * Authenticates a request using Clerk's session token.
 * If valid, syncs the user with the database and returns the User object.
 */
export async function authenticateClerkRequest(req: Request): Promise<User | null> {
  try {
    // Get the session from Clerk
    const sessionId = req.auth?.sessionId;
    const userId = req.auth?.userId;

    if (!sessionId || !userId) {
      return null;
    }

    // Get user info from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    if (!clerkUser) {
      return null;
    }

    // Sync user with database
    const dbUser = await db.upsertUser({
      openId: userId, // Use Clerk's user ID as the openId
      name: clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}` 
        : clerkUser.firstName || clerkUser.username || null,
      email: clerkUser.emailAddresses?.[0]?.emailAddress ?? null,
      loginMethod: "clerk",
      lastSignedIn: new Date(),
    });

    return dbUser;
  } catch (error) {
    console.error("[Clerk Auth] Authentication error:", error);
    return null;
  }
}
