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
    const auth = (req as any).auth;
    const userId = auth?.userId;

    if (!userId) {
      return null;
    }

    // Get user info from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    if (!clerkUser) {
      return null;
    }

    // Extract role from Clerk metadata
    const publicMetadata = clerkUser.publicMetadata as { role?: string };
    const validRoles = ["user", "employee", "circle", "admin"];
    const role = publicMetadata.role && validRoles.includes(publicMetadata.role) 
      ? (publicMetadata.role as "user" | "employee" | "circle" | "admin")
      : undefined;

    // Sync user with database
    await db.upsertUser({
      openId: userId, // Use Clerk's user ID as the openId
      name: clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}` 
        : clerkUser.firstName || clerkUser.username || null,
      email: clerkUser.emailAddresses?.[0]?.emailAddress ?? null,
      loginMethod: "clerk",
      lastSignedIn: new Date(),
      role: role,
    });

    // Fetch and return the synced user
    return await db.getUserByOpenId(userId) ?? null;
  } catch (error) {
    console.error("[Clerk Auth] Authentication error:", error);
    return null;
  }
}
