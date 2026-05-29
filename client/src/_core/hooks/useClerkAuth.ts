import { useAuth as useClerkAuthHook, useUser, useSignOut } from "@clerk/clerk-react";
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
  const { signOut } = useSignOut();
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

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (!isLoaded) return;
    if (isSignedIn) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    isLoaded,
    isSignedIn,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
