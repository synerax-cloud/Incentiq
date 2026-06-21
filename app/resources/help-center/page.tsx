import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { withLogo } from "@/components/ui/ServiceNowLogo";
import { helpArticles, helpCategories } from "@/content/help";

export const metadata: Metadata = {
  title: "Help center — IncentIQ",
  description:
    "Product documentation and answers to get your team up and running fast on IncentIQ.",
};

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="HELP CENTER"
          title={<>Answers to get you <span className="text-gradient">up and running.</span></>}
          description="Product documentation and step-by-step answers across setup, plans, payouts, and administration."
        />

        <section className="py-14 sm:py-16">
          <div className="shell">
            <div className="space-y-14">
              {helpCategories.map((cat) => {
                const articles = helpArticles.filter((a) => a.category === cat);
                if (articles.length === 0) return null;
                return (
                  <Reveal key={cat}>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-display text-display-3 font-bold text-dark-green">{cat}</h2>
                        <span className="rounded-full bg-light-green px-2.5 py-1 text-[11px] font-semibold text-dark-green">
                          {articles.length}
                        </span>
                      </div>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((a) => (
                          <Link
                            key={a.slug}
                            href={`/resources/help-center/${a.slug}`}
                            className="card group flex h-full flex-col p-6"
                          >
                            <h3 className="font-display text-[16px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green">
                              {withLogo(a.title, "lg")}
                            </h3>
                            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">{withLogo(a.excerpt, "sm")}</p>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-green transition-transform group-hover:translate-x-0.5">
                              <span className="text-slate">{a.readTime}</span>
                              <IconArrow className="ml-1 h-4 w-4" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
