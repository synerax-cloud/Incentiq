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
        {/* Hero */}
        <section className="mesh grain relative overflow-hidden pt-28 pb-16">
          <div className="shell relative">
            <div className="max-w-4xl">
              <span className="eyebrow">PRODUCT TOUR</span>
              <h1
                className="mt-4 font-display font-bold text-dark-green text-balance"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
              >
                See IncentIQ{" "}
                <span className="text-gradient">in action.</span>
              </h1>
              <p className="mt-4 max-w-[540px] text-[18px] leading-[1.6] text-[#475569]">
                A guided, step-by-step walkthrough of the full incentive lifecycle — from data ingestion to AI-powered insights.
              </p>
              <TourScrollButton />
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
