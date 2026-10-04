"use client";

import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";

/**
 * Page-wide scroll choreography, declared with data attributes so the sections
 * themselves can stay Server Components:
 *
 *   data-reveal          fade + rise once on enter (batched)
 *   data-reveal-lines    child [data-line] spans slide up out of their .line-mask
 *   data-scrub-words     child [data-word] spans brighten as the block scrolls through
 *   data-parallax="-20"  yPercent drift while in view (decorative layers only)
 *   data-parallax-media  oversized image layer drifts inside its clipped frame
 *   data-scroll-x="-22"  xPercent drift (ingredient ribbon)
 *
 * Everything lives inside gsap.matchMedia: with prefers-reduced-motion the
 * content is simply static and fully visible. Renders nothing.
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // ── Reveals ──────────────────────────────────────────────────────────
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => !el.closest("#pizzas"));
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((block) => {
        gsap.from(block.querySelectorAll("[data-line]"), {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
        });
      });

      // ── Scrubbed word highlight ──────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((block) => {
        gsap.fromTo(
          block.querySelectorAll("[data-word]"),
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: block, start: "top 82%", end: "bottom 48%", scrub: true },
          },
        );
      });

      // ── Parallax ─────────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 0 },
          {
            yPercent: Number(el.dataset.parallax) || -12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-media]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-x]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 0 },
          {
            xPercent: Number(el.dataset.scrollX) || -20,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  });

  return null;
}
