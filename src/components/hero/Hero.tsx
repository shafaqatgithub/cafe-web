"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { BRAND, HOURS } from "@/data/content";
import ButtonLink from "../ui/ButtonLink";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // ── Entrance ────────────────────────────────────────────────────────
        gsap.set(q("[data-hero-line]"), { yPercent: 112, opacity: 1 });
        gsap.set(q("[data-hero-fade]"), { y: 24, opacity: 0 });
        gsap.set(q("[data-hero-frame]"), { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 });
        gsap.set(q("[data-hero-zoom]"), { scale: 1.22 });
        gsap.set(q("[data-hero-badge]"), { scale: 0.6, rotate: -40, opacity: 0 });
        el.classList.remove("hero-pending");

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        tl.to(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
          .to(q("[data-hero-zoom]"), { scale: 1.02, duration: 2.2, ease: "expo.out" }, "<0.35")
          .to(q("[data-hero-line]"), { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.45)
          .to(q("[data-hero-fade]"), { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.95)
          .to(q("[data-hero-badge]"), { scale: 1, rotate: 0, opacity: 1, duration: 1.6 }, 1.1);

        // ── Scroll: the copy lifts away faster than the image (gentle parallax) ──
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-copy]"), { yPercent: -14, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-media]"), { yPercent: 7, ease: "none", scrollTrigger: st });
        gsap.fromTo(q("[data-hero-scroll-zoom]"), { scale: 1 }, { scale: 1.06, ease: "none", scrollTrigger: st });
      });

      mm.add(MQ.reduced, () => {
        el.classList.remove("hero-pending");
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="hero-pending relative overflow-hidden pt-(--nav-h)"
    >
      <div className="shell grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 gap-x-10 gap-y-10 pb-10 pt-6 lg:grid-cols-12 lg:items-end lg:pb-12 lg:pt-4">
        {/* Copy */}
        <div data-hero-copy className="relative z-10 lg:col-span-6 lg:pb-6">
          <p data-hero-anim data-hero-fade className="label mb-7 flex items-center gap-3 text-terracotta">
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {BRAND.descriptor} · Est. {BRAND.since}
          </p>

          <h1
            id="hero-title"
            className="display text-[clamp(3.7rem,9.6vw,10.75rem)] text-espresso lg:w-[118%]"
          >
            <span className="line-mask">
              <span data-hero-anim data-hero-line className="block">
                Made slow.
              </span>
            </span>
            <span className="line-mask">
              <span data-hero-anim data-hero-line className="block">
                <em className="italic text-terracotta">Served</em> fresh.
              </span>
            </span>
          </h1>

          <p data-hero-anim data-hero-fade className="mt-8 max-w-[29rem] text-[1.06rem] leading-relaxed text-espresso-soft">
            Hand-stretched dough from an oak-fired stone oven, burgers kissed with beech smoke and coffee roasted
            every Tuesday. Pull up a chair — nothing here is in a hurry.
          </p>

          <div data-hero-anim data-hero-fade className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="#menu">Explore the Menu</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Visit Us
            </ButtonLink>
          </div>

          <dl
            data-hero-anim
            data-hero-fade
            className="mt-14 hidden max-w-lg grid-cols-3 gap-6 border-t border-line pt-5 text-sm sm:grid"
          >
            <div>
              <dt className="label text-muted">Weekdays</dt>
              <dd className="mt-2 tabular text-espresso">
                {HOURS[0].open} – {HOURS[0].close}
              </dd>
            </div>
            <div>
              <dt className="label text-muted">Weekends</dt>
              <dd className="mt-2 tabular text-espresso">
                {HOURS[1].open} – {HOURS[1].close}
              </dd>
            </div>
            <div>
              <dt className="label text-muted">Find us</dt>
              <dd className="mt-2 text-espresso">{BRAND.address[0]}</dd>
            </div>
          </dl>
        </div>

        {/* Media */}
        <div data-hero-media className="relative lg:col-span-6 lg:self-stretch">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
