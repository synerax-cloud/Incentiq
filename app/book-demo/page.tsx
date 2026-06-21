import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { DemoForm } from "./DemoForm";
import { IconCheck } from "@/components/ui/icons";
import { ServiceNowLogo, withLogo } from "@/components/ui/ServiceNowLogo";

export const metadata: Metadata = {
  title: "Book a demo — IncentIQ",
  description:
    "See IncentIQ in action. Book a personalised walkthrough of AI-first incentive compensation on ServiceNow.",
};

const proof = [
  "30-minute personalised walkthrough",
  "Live on ServiceNow — see your real environment",
  "Get answers from an ICM specialist",
];

export default function BookDemoPage() {
  return (
    <>
      <Navbar />
      <main className="mesh grain relative min-h-screen overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-16">
        {/* ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal opacity-55 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-light-gray opacity-45 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-light-green opacity-60 blur-3xl" />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">

            {/* left — headline + proof */}
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">BOOK A DEMO</span>
              <h1 className="mt-4 font-display text-display-1 font-bold text-dark-green text-balance">
                See IncentIQ{" "}
                <span className="text-gradient">in action.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lead text-navy text-pretty">
                Get a personalised walkthrough of how IncentIQ transforms sales compensation — live on <ServiceNowLogo size="md" /> with your use case in focus.
              </p>

              <ul className="mt-8 space-y-3.5">
                {proof.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-navy">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green shadow-[0_2px_8px_rgba(0,166,81,0.25)]">
                      <IconCheck className="h-3 w-3 text-white" />
                    </span>
                    {withLogo(item, "md")}
                  </li>
                ))}
              </ul>

              {/* social proof strip */}
              <div className="mt-10 rounded-2xl border border-light-gray bg-white/70 p-5 backdrop-blur">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate">Trusted by revenue teams at</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {["Salesforce", "Workday", "SAP", "HubSpot", "Oracle"].map((name) => (
                    <span key={name} className="font-display text-[15px] font-bold text-dark-green/30">{name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* right — form */}
            <DemoForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
