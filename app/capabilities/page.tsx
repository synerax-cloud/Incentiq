import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Capabilities } from "@/components/sections/Capabilities";
import { Benefits } from "@/components/sections/Benefits";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import { IconArrow } from "@/components/ui/icons";
import { detailByGroup } from "@/content/detail";

export const metadata: Metadata = {
  title: "Capabilities — IncentIQ",
  description:
    "From org modeling and quota management to AI-assisted answers for reps, IncentIQ covers the full incentive lifecycle on a single platform.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="CAPABILITIES"
          title={<>Everything incentive operations need, <span className="text-gradient">in one place.</span></>}
          description="Organization modeling, quota management, incentive plan design, performance tracking, statements, dispute resolution, and an AI assistant — all on one governed platform."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore the platform", href: "/platform" }}
        />
        <Capabilities />

        {/* dedicated pages for each capability */}
        <section className="py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="EXPLORE EACH CAPABILITY"
                title={<>Dive into the details</>}
                description="Every capability has its own page — explore what each one does."
              />
            </Reveal>
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detailByGroup.capabilities.map((c) => {
                const Icon = c.highlights[0].icon;
                return (
                <RevealItem key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="card group flex h-full items-start gap-4 p-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-light-green text-dark-green ring-1 ring-light-green transition-colors group-hover:bg-green group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-semibold text-dark-green">
                          {c.slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                        </span>
                        <IconArrow className="h-4 w-4 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-green" />
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-slate">{c.lead}</span>
                    </span>
                  </Link>
                </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        <Benefits />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
