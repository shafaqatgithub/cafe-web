import { BRAND, HOURS } from "@/data/content";
import ButtonLink from "./ui/ButtonLink";
import SectionLabel from "./ui/SectionLabel";

/** Final call to action + visit/contact details (the "Contact" nav target). */
export default function CTA() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="section-y bg-stone">
      <div className="shell">
        <div className="flex flex-col items-start">
          <SectionLabel index="04">Visit us</SectionLabel>
          <h2 id="cta-title" data-reveal-lines className="display mt-6 text-[clamp(3.4rem,10.5vw,12rem)] text-espresso">
            <span className="line-mask">
              <span data-line className="block">
                Come hungry.
              </span>
            </span>
            <span className="line-mask">
              <span data-line className="block lg:pl-[12vw]">
                <em className="italic text-terracotta">Leave</em> happy.
              </span>
            </span>
          </h2>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 lg:ml-[12vw]">
            <ButtonLink href="#menu">Explore the Menu</ButtonLink>
            <ButtonLink href={BRAND.phoneHref} variant="secondary">
              Book a table
            </ButtonLink>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-line-strong pt-10 sm:grid-cols-3 lg:mt-32">
          <div data-reveal>
            <h3 className="label text-muted">Find us</h3>
            <address className="mt-4 not-italic leading-relaxed text-espresso">
              {BRAND.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address.join(", "))}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-terracotta underline-offset-4 hover:underline"
            >
              Get directions ↗
            </a>
          </div>
          <div data-reveal>
            <h3 className="label text-muted">Opening hours</h3>
            <dl className="mt-4 space-y-1.5 text-espresso">
              {HOURS.map((h) => (
                <div key={h.days} className="flex max-w-64 justify-between gap-6">
                  <dt>{h.days}</dt>
                  <dd className="tabular">
                    {h.open} – {h.close}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal>
            <h3 className="label text-muted">Reservations</h3>
            <p className="mt-4 leading-relaxed text-espresso">
              <a href={BRAND.phoneHref} className="inline-flex min-h-11 items-center hover:text-terracotta">
                {BRAND.phone}
              </a>
              <br />
              <a href={`mailto:${BRAND.email}`} className="inline-flex min-h-11 items-center hover:text-terracotta">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
