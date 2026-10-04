"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO, MEDIA } from "@/data/media";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type PlayState = "idle" | "playing" | "paused" | "ended";

/**
 * The burger video, framed in an oven-mouth arch.
 *  • Plays once — the smoke clears and the burger holds — with a visible
 *    pause / replay control.
 *  • Pauses whenever the hero is off-screen; never autoplays for reduced motion
 *    (a still of the finished burger is shown instead).
 *  • The 640×360 source is cover-cropped by the portrait arch, which also keeps
 *    the generator's corner watermark out of frame.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [state, setState] = useState<PlayState>("idle");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current && !v.ended) v.play().catch(() => setState("paused"));
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (state === "playing") {
      userPaused.current = true;
      v.pause();
    } else {
      userPaused.current = false;
      if (v.ended) v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const label = state === "playing" ? "Pause" : state === "ended" ? "Replay" : "Play";

  return (
    <figure className="relative flex h-full flex-col lg:justify-end">
      <div
        data-hero-anim
        data-hero-frame
        className="arch relative aspect-[4/5] w-full overflow-hidden bg-[#cfdbe0] shadow-lift sm:aspect-[5/5] lg:aspect-auto lg:max-h-[720px] lg:min-h-[480px] lg:flex-1"
      >
        <div data-hero-scroll-zoom className="absolute inset-0">
          {/* Inline transform (not Tailwind's `scale` property) so GSAP takes it over cleanly. */}
          <div data-hero-zoom className="absolute inset-0" style={{ transform: "scale(1.02)" }}>
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-[50%_62%] [filter:sepia(0.12)_saturate(0.95)]"
              src={HERO_VIDEO.src}
              poster={reduced ? MEDIA.burger.src : HERO_VIDEO.poster}
              width={HERO_VIDEO.width}
              height={HERO_VIDEO.height}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-label={HERO_VIDEO.alt}
              onPlay={() => setState("playing")}
              onPause={(e) => setState(e.currentTarget.ended ? "ended" : "paused")}
              onEnded={() => setState("ended")}
            />
          </div>
        </div>
        {/* Warm the cool backdrop slightly so it sits in the ivory palette. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#b9773f]/18 via-transparent to-[#f5f1e8]/10 mix-blend-multiply" />
      </div>

      <HeroBadge />

      <figcaption data-hero-anim data-hero-fade className="mt-4 flex items-center justify-between gap-4">
        <span className="label text-muted">
          Nº 01 <span className="mx-2 text-line-strong">/</span> The Smoke House burger
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label={`${label} the hero video`}
          className="label inline-flex min-h-11 items-center gap-2.5 text-espresso transition-colors hover:text-terracotta"
        >
          <span aria-hidden className="grid size-7 place-items-center rounded-full border border-line-strong">
            {state === "playing" ? (
              <svg viewBox="0 0 10 10" className="size-2.5">
                <path d="M2.5 1.5v7M7.5 1.5v7" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            ) : state === "ended" ? (
              <svg viewBox="0 0 12 12" className="size-3">
                <path d="M2.2 6a3.8 3.8 0 1 0 1.1-2.7M2.2 1.6v2.2h2.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="size-2.5">
                <path d="M2.5 1.2 8.5 5l-6 3.8Z" fill="currentColor" />
              </svg>
            )}
          </span>
          {label}
        </button>
      </figcaption>
    </figure>
  );
}

/** Circular stamp that overlaps the arch edge — turns slowly (CSS, paused for reduced motion). */
function HeroBadge() {
  return (
    <div
      data-hero-anim
      data-hero-badge
      aria-hidden
      className="absolute -top-9 right-4 size-24 sm:size-28 lg:-left-16 lg:right-auto lg:top-[16%] lg:size-36"
    >
      <div className="grid size-full place-items-center rounded-full bg-paper shadow-soft">
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full p-1.5 text-espresso">
          <defs>
            <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
          </defs>
          <text className="fill-current text-[10.4px] font-medium uppercase tracking-[0.32em]">
            <textPath href="#badge-circle">Wood-fired · Slow-risen · Hand-made ·</textPath>
          </text>
        </svg>
        <svg viewBox="0 0 24 24" className="size-6 lg:size-7">
          <path d="M12 3c4.2 4.2 5 7.8 2.9 10.7-1.5 2.1-4.3 2.1-5.8 0C7.2 11 8.1 7.4 12 3Z" className="fill-terracotta" />
          <path d="M5 20h14" stroke="currentColor" strokeWidth="1.4" className="text-espresso" />
        </svg>
      </div>
    </div>
  );
}
