"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, client-side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  // Mobile URL-bar show/hide resizes the viewport; don't recompute every trigger for it.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };

/** Shared easing vocabulary (see DESIGN_SYSTEM.md → Motion). */
export const EASE = {
  out: "expo.out",
  strong: "power4.out",
  soft: "power3.out",
  inOut: "expo.inOut",
} as const;

/** Motion (motion/react) equivalent of expo.out for UI micro-interactions. */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

/** gsap.matchMedia conditions shared by every animated component. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
} as const;
