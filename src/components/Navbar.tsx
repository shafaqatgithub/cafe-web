"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS, BRAND, HOURS } from "@/data/content";
import { lockScroll } from "@/lib/lenis";
import { MOTION_EASE } from "@/lib/gsap";
import Logo from "./ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Solid background after the first scroll; hide while scrolling down, reveal on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  // Highlight the link whose section sits in the middle of the viewport.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Mobile menu: lock scroll, Escape to close, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = toggle ?? f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  // Close the panel if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: MOTION_EASE, delay: hidden ? 0 : 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-ivory/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-(--nav-h) items-center justify-between gap-6">
          <a href="#main" aria-label={`${BRAND.name} — back to top`} className="relative z-10 -my-2 py-2">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative inline-flex min-h-11 items-center text-[0.84rem] font-medium tracking-wide text-espresso-soft transition-colors hover:text-espresso aria-[current]:text-espresso"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={`absolute bottom-2.5 left-0 h-px w-full origin-left bg-terracotta transition-transform duration-500 ease-expo ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#menu"
              className="hidden h-11 items-center rounded-full bg-espresso px-6 text-[0.82rem] font-medium tracking-wide text-paper transition-colors duration-500 ease-expo hover:bg-terracotta sm:inline-flex"
            >
              View Menu
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong text-espresso lg:hidden"
            >
              <span aria-hidden className="relative block h-2.5 w-4.5">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-expo ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-expo ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: MOTION_EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-(--nav-h) lg:hidden"
          >
            <ul className="shell mt-8 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: MOTION_EASE, delay: 0.15 + i * 0.05 }}
                  className="border-b border-line"
                >
                  <a href={l.href} onClick={close} className="flex items-baseline justify-between py-4">
                    <span className="display text-[2.6rem]">{l.label}</span>
                    <span className="label text-muted tabular">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="shell mt-auto flex flex-col gap-6 pb-10"
            >
              <a
                href="#menu"
                onClick={close}
                className="inline-flex h-13 items-center justify-center rounded-full bg-espresso text-sm font-medium text-paper"
              >
                View Menu
              </a>
              <div className="flex justify-between text-sm text-muted">
                <span>{BRAND.address.join(", ")}</span>
                <span className="tabular">
                  {HOURS[0].open}–{HOURS[0].close}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
