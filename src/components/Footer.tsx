import { BRAND, NAV_LINKS } from "@/data/content";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-espresso pt-20 text-paper/75 lg:pt-28">
      <div className="shell">
        <div className="grid gap-12 border-b border-paper/15 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed">
              Wood-fired pizza, artisan burgers, specialty coffee and fresh desserts. Made slow, served fresh — every day
              on Hearth Lane.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="label text-paper/50">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-10 items-center transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="label text-paper/50">Say hello</h2>
            <ul className="mt-4">
              <li>
                <a href={`mailto:${BRAND.email}`} className="inline-flex min-h-10 items-center transition-colors hover:text-paper">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.phoneHref} className="inline-flex min-h-10 items-center transition-colors hover:text-paper">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center transition-colors hover:text-paper"
                >
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="display select-none py-8 text-center text-[clamp(3.5rem,15.5vw,15.5rem)] leading-[0.85] text-paper/90">
          Ember <em className="italic text-terracotta-bright">&amp;</em> Crumb
        </p>

        <div className="flex flex-col gap-3 border-t border-paper/15 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ember &amp; Crumb. All rights reserved.</p>
          <a href="#main" className="inline-flex min-h-10 items-center gap-2 transition-colors hover:text-paper">
            Back to top
            <svg aria-hidden viewBox="0 0 12 12" className="size-3">
              <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
