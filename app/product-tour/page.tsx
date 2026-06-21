import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { TourCarousel } from "./TourCarousel";

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
        <PageHero
          eyebrow="PRODUCT TOUR"
          title={
            <>
              See IncentIQ{" "}
              <span className="text-gradient">in action.</span>
            </>
          }
          description="A guided, step-by-step walkthrough of the full incentive lifecycle — from data ingestion to AI-powered insights."
        />
        <TourCarousel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
