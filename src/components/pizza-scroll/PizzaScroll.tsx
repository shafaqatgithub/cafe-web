"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MOTION_EASE } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { PIZZA_CHAPTERS } from "@/data/content";
import { PIZZA_SEQUENCE, PIZZA_VIDEO } from "@/data/media";
import SectionLabel from "../ui/SectionLabel";

const chapterOf = (frame: number) => {
  const i = PIZZA_CHAPTERS.findIndex((c) => frame >= c.from && frame <= c.to);
  return i < 0 ? 0 : i;
};

export default function PizzaScroll() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <PizzaStoryboard /> : <PizzaVideo />;
}

function Heading() {
  return (
    <>
      <SectionLabel index="02">Crafted with patience</SectionLabel>
      <h2 id="pizza-title" className="display mt-5 text-[clamp(2.4rem,5.2vw,5.6rem)] text-espresso">
        From dough to the <em className="italic text-terracotta">perfect slice.</em>
      </h2>
    </>
  );
}

const INTRO =
  "Every pizza we serve takes three days and ninety seconds. Follow one from the first stretch of dough to the floor of our oven.";

/** Looping background video (motion allowed); the chapter panel follows its playback. */
function PizzaVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [chapter, setChapter] = useState(0);

  // Load + play only while the section is near the viewport; drive the chapter and progress bar from playback.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let raf = 0;
    let lastChapter = 0;
    const tick = () => {
      const p = video.duration ? video.currentTime / video.duration : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      // The video is the same story as the 240-frame sequence the chapters are written against.
      const c = chapterOf(Math.max(1, Math.ceil(p * PIZZA_SEQUENCE.frameCount)));
      if (c !== lastChapter) {
        lastChapter = c;
        setChapter(c);
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          video.play().catch(() => {}); // autoplay can be refused; the poster stays up
          raf = requestAnimationFrame(tick);
        } else {
          video.pause();
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const active = PIZZA_CHAPTERS[chapter];

  return (
    <section
      ref={sectionRef}
      id="pizzas"
      aria-labelledby="pizza-title"
      className="relative isolate min-h-svh overflow-hidden bg-stone"
    >
      <video
        ref={videoRef}
        aria-hidden
        muted
        loop
        playsInline
        preload="none"
        poster={PIZZA_VIDEO.poster}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[78%_50%] lg:object-[70%_50%]"
      >
        <source src={PIZZA_VIDEO.src} type="video/mp4" />
      </video>
      {/* Wash so the copy stays legible over the footage. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-stone)_0%,transparent_38%,transparent_62%,var(--color-stone)_100%)] lg:bg-[linear-gradient(to_right,var(--color-stone)_0%,color-mix(in_oklab,var(--color-stone)_70%,transparent)_38%,transparent_62%)]"
      />

      <div className="h-svh">
        <div className="shell grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-x-10 gap-y-4 pb-6 pt-[calc(var(--nav-h)+0.5rem)] lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:py-0">
          {/* Copy */}
          <div className="relative z-10 lg:col-span-5">
            <Heading />
            <p className="mt-6 hidden max-w-md leading-relaxed text-espresso-soft lg:block">{INTRO}</p>

            {/* Screen readers get the whole story at once; the visual panel below is decorative. */}
            <ol className="sr-only">
              {PIZZA_CHAPTERS.map((c) => (
                <li key={c.title}>
                  {c.title}: {c.text}
                </li>
              ))}
            </ol>

            <ol aria-hidden className="mt-12 hidden grid-cols-5 gap-3 border-t border-line lg:grid">
              {PIZZA_CHAPTERS.map((c, i) => (
                <li
                  key={c.title}
                  className={`relative pt-4 transition-colors duration-500 ${i === chapter ? "text-espresso" : "text-muted/55"}`}
                >
                  <span
                    className={`absolute -top-px left-0 h-px bg-terracotta transition-[width] duration-700 ease-expo ${
                      i === chapter ? "w-full" : "w-0"
                    }`}
                  />
                  <span className="label tabular">0{i + 1}</span>
                  <span className="mt-2 block text-[0.82rem] leading-snug">{c.title}</span>
                </li>
              ))}
            </ol>

            <div aria-hidden className="relative mt-8 hidden min-h-[8.5rem] lg:block">
              <ChapterText chapter={chapter} title={active.title} text={active.text} />
            </div>
          </div>

          {/* Stage — the video shows through here */}
          <div className="relative min-h-0 lg:col-span-7 lg:h-[80svh]">
            <div aria-hidden className="absolute right-0 top-1/2 hidden h-44 w-px -translate-y-1/2 bg-line lg:block">
              <span ref={barRef} className="block h-full w-full origin-top scale-y-0 bg-terracotta" />
            </div>
          </div>

          {/* Mobile chapter panel */}
          <div aria-hidden className="relative min-h-[7.5rem] border-t border-line pt-4 lg:hidden">
            <ChapterText chapter={chapter} title={active.title} text={active.text} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterText({
  chapter,
  title,
  text,
  compact = false,
}: {
  chapter: number;
  title: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={chapter}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: MOTION_EASE }}
      >
        <p className={`display ${compact ? "text-[1.9rem]" : "text-[2.4rem]"} text-espresso`}>
          <span className="mr-3 align-top font-sans text-xs tracking-[0.2em] text-terracotta tabular">0{chapter + 1}</span>
          {title}
        </p>
        <p className={`mt-2 max-w-md leading-relaxed text-espresso-soft ${compact ? "text-[0.92rem]" : ""}`}>{text}</p>
      </motion.div>
    </AnimatePresence>
  );
}

/** Reduced motion: a still storyboard of real frames — same story, no scrubbing. */
function PizzaStoryboard() {
  const beats = [
    { frame: 1, chapter: 0 },
    { frame: 97, chapter: 1 },
    { frame: 232, chapter: 4 },
  ];
  return (
    <section id="pizzas" aria-labelledby="pizza-title" className="section-y bg-stone">
      <div className="shell">
        <div className="max-w-3xl">
          <Heading />
          <p className="mt-6 max-w-md leading-relaxed text-espresso-soft">{INTRO}</p>
        </div>
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {beats.map(({ frame, chapter }) => {
            const c = PIZZA_CHAPTERS[chapter];
            return (
              <li key={frame}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={PIZZA_SEQUENCE.src(frame)}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-[92%_50%]"
                  />
                </div>
                <p className="display mt-6 text-3xl">
                  <span className="mr-3 align-top font-sans text-xs tracking-[0.2em] text-terracotta">0{chapter + 1}</span>
                  {c.title}
                </p>
                <p className="mt-2 text-espresso-soft">{c.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
