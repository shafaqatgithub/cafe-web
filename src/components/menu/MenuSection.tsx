"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { MENU_CATEGORIES } from "@/data/content";
import { MOTION_EASE } from "@/lib/gsap";
import SectionLabel from "../ui/SectionLabel";

export default function MenuSection() {
  const [cat, setCat] = useState(0);
  const [preview, setPreview] = useState(MENU_CATEGORIES[0].lead ?? 0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const category = MENU_CATEGORIES[cat];
  const featured = category.items[preview] ?? category.items[0];

  const select = (i: number) => {
    setCat(i);
    setPreview(MENU_CATEGORIES[i].lead ?? 0);
  };

  // WAI-ARIA tabs: arrows move + activate, Home/End jump.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = MENU_CATEGORIES.length;
    const next =
      e.key === "ArrowRight" ? (cat + 1) % n : e.key === "ArrowLeft" ? (cat - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-y bg-paper">
      <div className="shell">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <SectionLabel index="03">The menu</SectionLabel>
            <h2 id="menu-title" data-reveal-lines className="display mt-5 text-[clamp(2.6rem,5.6vw,6rem)] text-espresso">
              <span className="line-mask">
                <span data-line className="block">
                  Simple food,
                </span>
              </span>
              <span className="line-mask">
                <span data-line className="block">
                  <em className="italic text-terracotta">done properly.</em>
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm leading-relaxed text-espresso-soft lg:col-span-4 lg:col-start-9 lg:pb-3">
            A short menu that changes with the season. Everything is made here, from the dough to the caramel.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          onKeyDown={onKeyDown}
          className="-mx-(--gutter) mt-16 flex gap-1 overflow-x-auto border-b border-line px-(--gutter) [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-20"
        >
          {MENU_CATEGORIES.map((c, i) => {
            const selected = i === cat;
            return (
              <button
                key={c.name}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={`relative flex min-h-14 shrink-0 items-baseline gap-2 px-4 pb-4 pt-3 transition-colors first:pl-0 sm:px-7 sm:first:pl-0 ${
                  selected ? "text-espresso" : "text-muted hover:text-espresso"
                }`}
              >
                <span className="label tabular text-[0.62rem]">0{i + 1}</span>
                <span className="display text-[1.9rem] sm:text-[2.3rem]">{c.name}</span>
                {selected && (
                  <motion.span
                    layoutId={`${uid}-underline`}
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-terracotta first:left-0"
                    transition={{ duration: 0.6, ease: MOTION_EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${cat}`}
          tabIndex={0}
          className="mt-12 grid gap-y-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-12"
        >
          {/* Preview image */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-stone lg:aspect-square">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={featured.image.src}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: MOTION_EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured.image.src}
                      alt={featured.image.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: featured.image.focus ?? "50% 50%" }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="label mt-4 flex justify-between gap-4 text-muted">
                <span>{featured.name}</span>
                <span>{category.note}</span>
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={category.name}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
              >
                {category.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: MOTION_EASE } },
                    }}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    className={`group flex gap-5 border-b border-line py-6 transition-colors first:pt-0 sm:gap-7 ${
                      preview === i ? "lg:border-line-strong" : ""
                    }`}
                  >
                    <div className="relative size-18 shrink-0 overflow-hidden rounded-[2px] bg-stone sm:size-22">
                      <Image
                        src={item.image.src}
                        alt=""
                        fill
                        sizes="88px"
                        className="object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
                        style={{ objectPosition: item.image.focus ?? "50% 50%" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="display text-[1.75rem] text-espresso sm:text-[2.05rem]">{item.name}</h3>
                        {item.tags?.map((t) => (
                          <span key={t} className="label hidden rounded-full border border-line-strong px-2 py-1 text-[0.58rem] text-muted sm:inline">
                            {t === "V" ? <abbr title="Vegetarian" className="no-underline">V</abbr> : t}
                          </span>
                        ))}
                        <span aria-hidden className="mb-1.5 hidden flex-1 border-b border-dotted border-line-strong sm:block" />
                        <p className="display ml-auto text-[1.75rem] text-espresso tabular sm:ml-0 sm:text-[2.05rem]">
                          <span className="sr-only">Price: </span>
                          {item.price}
                        </p>
                      </div>
                      <p className="mt-1.5 max-w-lg text-[0.95rem] leading-relaxed text-espresso-soft">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-8 text-sm text-muted">
              <abbr title="Vegetarian" className="no-underline">V</abbr> — vegetarian. Please tell us about any allergies;
              most dishes can be adapted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
