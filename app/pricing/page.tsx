import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconCheck, IconSpark } from "@/components/ui/icons";
import { ServiceNowLogo, withLogo } from "@/components/ui/ServiceNowLogo";

const tiers = [
  {
    name: "Growth",
    tagline: "For teams modernizing their first incentive plans.",
    badge: null,
    highlight: false,
    features: [
      "Quota & plan management",
      "Real-time performance tracking",
      "Itemized payout statements",
      "Standard ServiceNow governance",
      "Email support",
    ],
    cta: "Get started",
  },
  {
    name: "Enterprise",
    tagline: "For complex orgs that need AI and full governance.",
    badge: "Most popular",
    highlight: true,
    features: [
      "Everything in Growth",
      "AI assistant & forecasting",
      "Anomaly detection & coaching",
      "Dispute resolution workflows",
      "Multi-business-unit modeling",
      "Priority support & onboarding",
    ],
    cta: "Book a demo",
  },
  {
    name: "Custom",
    tagline: "For global enterprises with bespoke requirements.",
    badge: null,
    highlight: false,
    features: [
      "Everything in Enterprise",
      "Custom integrations",
      "Dedicated success manager",
      "Advanced security & compliance",
      "SLA-backed support",
    ],
    cta: "Talk to sales",
  },
];

const faqs = [
  { q: "How is pricing structured?", a: "Pricing is tailored to your organization size and the modules you need. All plans run natively on ServiceNow and are scoped to your contract." },
  { q: "Do I need an existing ServiceNow instance?", a: "Yes. IncentIQ is a native Now Platform application, so you'll need a ServiceNow instance. We can help assess requirements during the demo." },
  { q: "Can I start small and expand later?", a: "Absolutely. Customers typically start with Growth (quotas + plans) and add AI modules and governance workflows as adoption grows." },
  { q: "What integrations are supported?", a: "IncentIQ integrates with Salesforce, Workday, SAP, NetSuite, HubSpot, and any CRM, ERP, or HRMS with standard connectors." },
];

export const metadata: Metadata = {
  title: "Pricing — IncentIQ",
  description:
    "Flexible plans for AI-first incentive compensation on ServiceNow — from growing teams to global enterprises.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="PRICING"
          title={<>Pricing that scales <span className="text-gradient">with your team.</span></>}
          description="Transparent plans built on the Now Platform. Start where you are and add AI, governance, and scale as you grow."
          secondary={{ label: "Talk to sales", href: "/#demo" }}
        />

        {/* tiers */}
        <section className="bg-light-green py-14 sm:py-16">
          <div className="shell">
            <RevealGroup className="grid items-stretch gap-5 lg:grid-cols-3">
              {tiers.map((t) => (
                <RevealItem key={t.name}>
                  <article className={[
                    "relative flex h-full flex-col overflow-hidden rounded-xl3",
                    t.highlight
                      ? "bg-gradient-to-br from-[#0F2E24] via-[#00A651] to-[#0F2E24] text-white shadow-float ring-1 ring-white/10"
                      : "card",
                  ].join(" ")}>
                    {/* top accent bar for highlighted */}
                    {t.highlight ? (
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky/0 via-accent-green to-sky/0" />
                    ) : null}

                    <div className="flex flex-1 flex-col p-6">
                      {t.badge ? (
                        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky">
                          <IconSpark className="h-3 w-3" />
                          {t.badge}
                        </span>
                      ) : null}

                      <h3 className={`font-display text-display-3 font-bold ${t.highlight ? "text-white" : "text-dark-green"}`}>
                        {t.name}
                      </h3>
                      <p className={`mt-2 text-[13.5px] leading-relaxed ${t.highlight ? "text-white/65" : "text-slate"}`}>
                        {t.tagline}
                      </p>

                      <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${t.highlight ? "border-white/12" : "border-light-gray"}`}>
                        {t.features.map((f, fi) => (
                          <li key={fi} className={`flex items-start gap-2.5 text-[13.5px] ${t.highlight ? "text-white/80" : "text-navy"}`}>
                            <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${t.highlight ? "bg-white/30 text-white" : "bg-green text-white"}`}>
                              <IconCheck className="h-2.5 w-2.5" />
                            </span>
                            {withLogo(f, "sm")}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <Link
                          href="/book-demo"
                          className={[
                            "group flex w-full items-center justify-center gap-2 rounded-full py-3 text-[0.9rem] font-semibold transition-all duration-300",
                            t.highlight
                              ? "bg-white text-dark-green shadow-soft hover:bg-light-green hover:text-green"
                              : "bg-[#00A651] text-white shadow-soft hover:bg-[#0F2E24] hover:shadow-[0_10px_28px_rgba(0,166,81,0.30)]",
                          ].join(" ")}
                        >
                          {t.cta}
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <p className="mt-10 text-center text-[13px] text-slate">
                All plans run natively on <ServiceNowLogo size="sm" />. Pricing is tailored to org size and modules — talk to us for a quote.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16">
          <div className="shell">
            <Reveal>
              <h2 className="font-display text-display-2 font-bold text-dark-green text-balance">
                Common questions
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {faqs.map((faq, fi) => (
                <Reveal key={fi}>
                  <div className="rounded-2xl border border-light-gray bg-white p-6 sm:p-7">
                    <h3 className="font-display text-[16px] font-bold text-dark-green">{withLogo(faq.q, "lg")}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-slate">{withLogo(faq.a, "md")}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
