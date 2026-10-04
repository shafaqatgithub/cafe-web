"use client";

import type Lenis from "lenis";

/** Module-level handle to the single Lenis instance created by <SmoothScroll />. */
let instance: Lenis | null = null;

export const lenisStore = {
  get: () => instance,
  set: (l: Lenis | null) => {
    instance = l;
  },
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to an in-page anchor ("#menu"), via Lenis when available. */
export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const lenis = lenisStore.get();
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.6,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo.out
    });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  // Move keyboard focus to the section for screen-reader / keyboard users.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function lockScroll(locked: boolean) {
  const lenis = lenisStore.get();
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
