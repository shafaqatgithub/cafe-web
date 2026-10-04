"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. The server snapshot is `serverValue`, so the
 * first client render matches the HTML and then updates (no hydration error).
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True on mouse/trackpad devices (custom cursor, magnetic buttons). */
export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
