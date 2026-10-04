"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";

/** Client-side providers: Motion honours the OS reduced-motion setting; Lenis smooth scroll. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
