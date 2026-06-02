import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { trpc } from "@/lib/trpc";
import type { User } from "../../../../drizzle/schema";

// Global variable to store the latest session token for tRPC headers
let latestSessionToken: string | null = null;

export function getSupabaseToken() {
  return latestSessionToken;
}

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const utils = trpc.useUtils();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      latestSessionToken = session?.access_token ?? null;
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      latestSessionToken = session?.access_token ?? null;
      setLoading(false);
      if (_event === 'SIGNED_IN') {
        utils.auth.me.invalidate();
      }
    });

    return () => subscription.unsubscribe();
  }, [utils]);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: !!session,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    await utils.auth.me.invalidate();
    window.location.href = "/";
  }, [utils]);

  const state = useMemo(() => {
    if (loading) {
      return {
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    }

    if (!session) {
      return {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    }

    // Full auth state resolved
    const user = meQuery.data ?? null;
    const supabaseRole = (session?.user?.user_metadata as any)?.role?.toLowerCase();
    
    // Use the database role if available, otherwise fallback to Supabase metadata
    const effectiveRole = user?.role || supabaseRole;

    return {
      user: user ? { ...user, role: effectiveRole } : null,
      loading: meQuery.isLoading,
      error: meQuery.error ?? null,
      isAuthenticated: !!user,
    };
  }, [loading, session, meQuery.data, meQuery.isLoading, meQuery.error]);

  return {
    ...state,
    session,
    supabaseUser: session?.user ?? null,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
