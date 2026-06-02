import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { trpc } from "@/lib/trpc";

let latestSessionToken: string | null = null;

export function getSupabaseToken() {
  return latestSessionToken;
}

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const utils = trpc.useUtils();

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      latestSessionToken = session?.access_token ?? null;
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      latestSessionToken = session?.access_token ?? null;
      setLoading(false);
      
      if (_event === 'SIGNED_IN' || _event === 'USER_UPDATED') {
        utils.auth.me.invalidate();
      }
    });

    return () => subscription.unsubscribe();
  }, [utils]);

  // Fetch the user profile from our database
  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: !!session,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    latestSessionToken = null;
    window.location.href = "/";
  }, []);

  const state = useMemo(() => {
    // If we're still checking the basic Supabase session
    if (loading) {
      return { user: null, loading: true, isAuthenticated: false };
    }

    // If there's no session, they are definitely not authenticated
    if (!session) {
      return { user: null, loading: false, isAuthenticated: false };
    }

    // If we have a session but are still fetching the profile
    if (meQuery.isLoading) {
      return { user: null, loading: true, isAuthenticated: true };
    }

    // Full state resolved
    return {
      user: meQuery.data ?? null,
      loading: false,
      isAuthenticated: !!meQuery.data,
      error: meQuery.error
    };
  }, [loading, session, meQuery.isLoading, meQuery.data, meQuery.error]);

  return {
    ...state,
    session,
    supabaseUser: session?.user ?? null,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
