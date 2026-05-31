import { supabaseAdmin } from "./supabase";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

/**
 * Authenticates a request using Supabase's JWT token.
 * If valid, syncs the user with the database and returns the User object.
 */
export async function authenticateSupabaseRequest(req: Request): Promise<User | null> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const { data: { user: supabaseUser }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !supabaseUser) {
      console.error("[Supabase Auth] Failed to get user:", error?.message);
      return null;
    }

    // Extract role from Supabase user_metadata (case-insensitive)
    const metadata = supabaseUser.user_metadata as { role?: string };
    const rawRole = metadata.role?.toLowerCase().trim();
    const validRoles = ["user", "employee", "circle", "admin"];
    const role = rawRole && validRoles.includes(rawRole) 
      ? (rawRole as "user" | "employee" | "circle" | "admin")
      : undefined;

    // Sync user with database
    const user = await db.upsertUser({
      openId: supabaseUser.id,
      name: (supabaseUser.user_metadata as any)?.full_name || supabaseUser.email?.split('@')[0] || "Anonymous",
      email: supabaseUser.email ?? "",
      avatar: (supabaseUser.user_metadata as any)?.avatar_url || null,
      loginMethod: "supabase",
      role: role,
    });

    return user;
  } catch (error) {
    console.error("[Supabase Auth] Authentication error:", error);
    return null;
  }
}
