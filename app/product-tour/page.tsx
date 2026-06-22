import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TourCarousel } from "./TourCarousel";
import { TourScrollButton } from "./TourScrollButton";

export const metadata: Metadata = {
  title: "Product Tour — IncentIQ",
  description:
    "A guided, step-by-step walkthrough of the full incentive lifecycle — from data ingestion to AI-powered insights.",
};

export default function ProductTourPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — full viewport height, content vertically centered */}
        <section className="mesh grain relative overflow-hidden flex items-center min-h-screen">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">PRODUCT TOUR</span>
              <h1
                className="mt-4 font-display font-bold text-dark-green text-balance text-center"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
              >
                See IncentIQ{" "}
                <span className="text-gradient">in action.</span>
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-[20px] leading-[1.6] text-[#475569] text-center">
                Watch every stage come alive — from raw CRM data to AI-driven insights. One intelligent, transparent, fully governed workflow, built to scale with the enterprise.
              </p>

              {/* Feature strip */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {[
                  "Enterprise-grade",
                  "Transparent by design",
                  "Governed & audit-ready",
                  "AI-powered intelligence",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[14px] font-medium text-[#475569]">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E8F5E9]">
                      <svg className="h-3.5 w-3.5 text-[#00A651]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex justify-center">
                <TourScrollButton />
              </div>
            </div>
          </div>
        </section>

        {/* Divider between hero and tab bar */}
        <div className="shell">
          <div className="divider-x" />
        </div>

        <TourCarousel />

<FinalCTA />
      </main>
      <Footer />
    </>
  );
}
