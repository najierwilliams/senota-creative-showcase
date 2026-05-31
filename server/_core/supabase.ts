import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

if (!ENV.supabaseUrl || !ENV.supabaseServiceRoleKey) {
  console.warn("Missing Supabase server environment variables. Server-side auth may fail.");
}

// Service role client for admin operations (bypass RLS)
export const supabaseAdmin = createClient(
  ENV.supabaseUrl,
  ENV.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
