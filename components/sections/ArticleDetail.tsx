import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FinalCTA } from "./FinalCTA";
import { Reveal } from "../ui/Reveal";
import { IconArrow, IconCheck } from "../ui/icons";
import { ServiceNowLogo, withLogo } from "../ui/ServiceNowLogo";

export type ArticleSection = { heading: string; paragraphs: string[] };

export type RelatedItem = { href: string; title: string; excerpt: string; chip: string };

export function ArticleDetail({
  backHref,
  backLabel,
  chips,
  title,
  excerpt,
  sections,
  relatedTitle,
  related,
}: {
  backHref: string;
  backLabel: string;
  chips: string[];
  title: string;
  excerpt: string;
  sections: ArticleSection[];
  relatedTitle: string;
  related: RelatedItem[];
}) {
  return (
    <>
      <Navbar />
      <main>
        {/* article hero */}
        <section className="mesh grain relative overflow-hidden pb-12 pt-32 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-teal opacity-55 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/3 h-48 w-48 rounded-full bg-light-green opacity-60 blur-3xl" />
          <div className="shell relative">
            <div className="mx-auto max-w-3xl">
              {/* back link */}
              <Link
                href={backHref}
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-green transition-colors hover:text-dark-green"
              >
                <IconArrow className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                {backLabel}
              </Link>

              {/* chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px] font-medium">
                {chips.map((c, i) => (
                  <span
                    key={c}
                    className={
                      i === 0
                        ? "rounded-full bg-green px-3 py-1 text-[11.5px] font-semibold text-white"
                        : "flex items-center gap-2 text-slate before:h-1 before:w-1 before:rounded-full before:bg-light-gray"
                    }
                  >
                    {c}
                  </span>
                ))}
              </div>

              <h1 className="mt-6 font-display text-display-1 font-bold text-dark-green text-balance">{withLogo(title, "xl")}</h1>
              <p className="mt-5 text-lead text-navy text-pretty">{withLogo(excerpt, "md")}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-gray/60 to-transparent" />
        </section>

        {/* article body */}
        <article className="py-14 sm:py-16">
          <div className="shell">
            <div className="mx-auto max-w-3xl">
              {/* section list */}
              <div className="space-y-12">
                {sections.map((section, idx) => (
                  <Reveal key={section.heading}>
                    <div className="group relative pl-7">
                      {/* section number accent */}
                      <span className="absolute left-0 top-1 select-none font-display text-[11px] font-bold text-green/50">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-display-3 font-bold text-dark-green">{section.heading}</h2>
                      {section.paragraphs.map((p, i) => (
                        <p key={i} className="mt-4 text-[16.5px] leading-[1.8] text-navy">{withLogo(p, "md")}</p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* takeaway callout */}
              <Reveal>
                <div className="mt-14 overflow-hidden rounded-2xl border border-light-green bg-gradient-to-br from-light-green to-white">
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-green">
                        <IconCheck className="h-3 w-3 text-white" />
                      </span>
                      The takeaway
                    </div>
                    <p className="mt-4 text-[16px] leading-relaxed text-navy">
                      IncentIQ brings incentive data, calculations, and AI into one governed system on <ServiceNowLogo size="md" /> — so compensation is transparent, intelligent, and trusted at enterprise scale.
                    </p>
                    <Link
                      href="/book-demo"
                      className="group mt-5 inline-flex items-center gap-1.5 rounded-full bg-green px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-dark-green"
                    >
                      Book a demo
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </article>

        {/* related items */}
        {related.length > 0 ? (
          <section className="border-t border-light-gray bg-light-gray py-14 sm:py-16">
            <div className="shell">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-display-3 font-bold text-dark-green">{relatedTitle}</h2>
                <Link href={backHref} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green hover:text-dark-green">
                  View all
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="card group flex h-full flex-col p-6">
                    <span className="w-fit rounded-full bg-light-green px-2.5 py-1 text-[11px] font-semibold text-dark-green">{r.chip}</span>
                    <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green">{withLogo(r.title, "lg")}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">{withLogo(r.excerpt, "sm")}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-light-gray pt-4 text-[12.5px] font-semibold text-green transition-transform group-hover:translate-x-0.5">
                      Read more
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
