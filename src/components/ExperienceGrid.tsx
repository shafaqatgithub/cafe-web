import Image from "next/image";
import { OFFERINGS } from "@/data/content";
import SectionLabel from "./ui/SectionLabel";

/** Four signature offerings in an aligned row (snap-scroll strip on phones). */
export default function ExperienceGrid() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y bg-paper">
      <div className="shell">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Signature experience</SectionLabel>
            <h2 id="experience-title" data-reveal-lines className="display mt-5 text-[clamp(2.6rem,5.6vw,6rem)] text-espresso">
              <span className="line-mask">
                <span data-line className="block">
                  Four things we
                </span>
              </span>
              <span className="line-mask">
                <span data-line className="block">
                  do <em className="italic text-terracotta">slowly.</em>
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm leading-relaxed text-espresso-soft lg:col-span-4 lg:col-start-9 lg:pb-3">
            One kitchen, two fires and a coffee bar. Everything is made in-house, in small batches, from morning until
            the oven goes quiet.
          </p>
        </div>

        <ul className="-mx-(--gutter) mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--gutter) pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:mt-24 lg:grid-cols-4">
          {OFFERINGS.map((o, i) => (
            <li
              key={o.title}
              data-reveal
              className="w-[78%] shrink-0 snap-start sm:w-auto"
            >
              <a href={o.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-stone">
                  <Image
                    src={o.image.src}
                    alt={o.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                    className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.045]"
                    style={{ objectPosition: o.image.focus ?? "50% 50%" }}
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <p className="label text-terracotta">
                    <span className="tabular text-muted">0{i + 1}</span>
                    <span className="mx-2 text-line-strong">/</span>
                    {o.kicker}
                  </p>
                </div>
                <h3 className="display mt-3 text-[2.1rem] text-espresso">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-expo group-hover:bg-[length:100%_1px]">
                    {o.title}
                  </span>
                </h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-espresso-soft">{o.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
