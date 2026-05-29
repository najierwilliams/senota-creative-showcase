import { useAuth as useClerkAuthHook, useUser, useClerk } from "@clerk/clerk-react";
import { trpc } from "@/lib/trpc";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/account" } = options ?? {};
  const { isSignedIn, isLoaded } = useClerkAuthHook();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const utils = trpc.useUtils();

  // Fetch the user from the backend (which syncs with Clerk)
  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: isSignedIn && isLoaded,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = useCallback(async () => {
    try {
      // Call backend logout to clear session
      await utils.auth.me.invalidate();
      // Sign out from Clerk
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
      // Still sign out even if backend fails
      await signOut({ redirectUrl: "/" });
    }
  }, [signOut, utils]);

  const state = useMemo(() => {
    if (!isLoaded) {
      return {
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    }

    if (!isSignedIn) {
      return {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    }

    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(meQuery.data)
    );

    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading,
      error: meQuery.error ?? null,
      isAuthenticated: Boolean(meQuery.data),
    };
  }, [
    isLoaded,
    isSignedIn,
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
  ]);

  // We've removed the automatic redirect logic here to prevent reload loops.
  // Redirection is now handled by the individual pages and components.

  return {
    ...state,
    isSignedIn,
    isLoaded,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
