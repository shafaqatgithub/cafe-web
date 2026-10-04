"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore, scrollToTarget } from "@/lib/lenis";

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so Lenis, ScrollTrigger and
 * every scrubbed tween share ONE requestAnimationFrame loop (no double rAF,
 * no one-frame lag between scroll position and scrubbed animations).
 * Disabled entirely for prefers-reduced-motion (native scrolling).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        syncTouch: false, // native touch momentum feels better on phones and costs less
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenisStore.set(lenis);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
      lenisStore.set(null);
    };

    if (!mql.matches) start();
    const onChange = () => {
      stop();
      if (!mql.matches) start();
      ScrollTrigger.refresh();
    };
    mql.addEventListener("change", onChange);

    // Layout settles once web fonts and late images arrive — recompute trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // Every in-page link (rendered by Server Components too) scrolls through Lenis.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  return <>{children}</>;
}
