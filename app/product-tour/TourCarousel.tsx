"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  IconData, IconWorkflow, IconScale, IconGovernance, IconPlan, IconOrg,
  IconBusinessUnit, IconVisibility, IconQuota, IconStatement, IconDispute,
  IconAttainment, IconPerformance, IconAnomaly, IconForecast,
  IconAssistant, IconSpark,
  type IconProps,
} from "@/components/ui/icons";

/* ── Types ───────────────────────────────────────────────────────────── */

type Feature = { icon: (p: IconProps) => JSX.Element; title: string; body: string };
type Slide   = { file: string; caption: string };
type TabData = { id: string; label: string; banner: string; features: Feature[]; slides: Slide[] };

/* ── Tab data ────────────────────────────────────────────────────────── */

const TABS: TabData[] = [
  {
    id: "data-import",
    label: "Data Import",
    banner: "Connect your CRM and ingest data into IncentIQ.",
    features: [
      { icon: IconData,     title: "CRM Integration",     body: "Connect directly to your CRM to ingest sales data into IncentIQ automatically." },
      { icon: IconWorkflow, title: "Flexible Data Models", body: "Define custom data structures that match your organization's data schema." },
      { icon: IconScale,    title: "Metadata Mapping",     body: "Map incoming fields to IncentIQ's data model for accurate, reliable processing." },
    ],
    slides: [
      { file: "01_admin.png",                         caption: "Start in the Admin workspace where you configure and manage your IncentIQ environment." },
      { file: "05_look-up-tables.png",                caption: "Set up look-up tables that standardize and map your incoming data values." },
      { file: "06_import-data-create-data-model.png", caption: "Create a data model that defines the structure of the data you're importing." },
      { file: "07_import-data-upload-csv.png",        caption: "Upload your source data via CSV from your CRM or existing systems." },
      { file: "08_import-data-preview-records.png",   caption: "Preview imported records to verify the data before committing." },
      { file: "09_import-data-metadata-mapping.png",  caption: "Map metadata fields so imported data aligns with IncentIQ's data model." },
    ],
  },
  {
    id: "fiscal-calendar",
    label: "Fiscal Calendar",
    banner: "Set up your fiscal calendar and periods.",
    features: [
      { icon: IconGovernance, title: "Calendar Configuration", body: "Set up fiscal calendars aligned to your organization's financial year." },
      { icon: IconPlan,       title: "Period Management",      body: "Define and manage fiscal periods with custom display names for clear reporting." },
      { icon: IconOrg,        title: "Multi-Calendar Support", body: "Support multiple fiscal calendars across different business units or regions." },
    ],
    slides: [
      { file: "02_fiscal-calendar-list.png",                      caption: "View and manage all your fiscal calendars in one place." },
      { file: "03_fiscal-calendar-create.png",                    caption: "Create a new fiscal calendar tailored to your organization's financial year." },
      { file: "04_fiscal-periods-display-name-configuration.png", caption: "Configure fiscal period display names for clear, readable reporting." },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    banner: "Build your business unit structure and sales hierarchy.",
    features: [
      { icon: IconBusinessUnit, title: "Business Unit Structure", body: "Model your organization hierarchy with business units, teams, and territories." },
      { icon: IconOrg,          title: "Team Assignments",        body: "Add team members and assign them to the right business units per your sales hierarchy." },
      { icon: IconVisibility,   title: "Hierarchy Visualization", body: "View business unit and team hierarchies in clear, navigable structures." },
    ],
    slides: [
      { file: "10_organization.png",                           caption: "Open the Organization workspace to model your incentive structure." },
      { file: "11_organization-add-business-unit.png",         caption: "Add business units to create your organizational structure." },
      { file: "12_organization-add-team-member.png",           caption: "Add team members and assign them to business units per your sales hierarchy." },
      { file: "13_organization-view-business-unit-hierarchy.png", caption: "Visualize the full business unit hierarchy at a glance." },
      { file: "14_organization-view-team-hierarchy.png",       caption: "Review the team hierarchy and reporting relationships." },
      { file: "15_organization-view-team-directory.png",       caption: "Browse the complete team directory of all participants." },
    ],
  },
  {
    id: "quota-setup",
    label: "Quota",
    banner: "Create, distribute, approve, and assign quotas.",
    features: [
      { icon: IconQuota,      title: "Quota Creation",        body: "Create and define quotas across regions, teams, products, and individual sellers." },
      { icon: IconWorkflow,   title: "Period Distribution",   body: "Distribute quota targets across fiscal periods with flexible allocation controls." },
      { icon: IconGovernance, title: "Approval & Assignment", body: "Route quotas through approval workflows and assign them to the right participants." },
    ],
    slides: [
      { file: "16_quota-list.png",              caption: "See all quotas across your organization in one list view." },
      { file: "17_quota-create-quota.png",      caption: "Create a new quota and define its targets." },
      { file: "18_quota-quota-distribution.png",caption: "Adjust quota distribution across the fiscal periods." },
      { file: "19_quota-quota-approval.png",    caption: "Route the quota through the approval workflow." },
      { file: "20_quota-quota-assignment.png",  caption: "Assign approved quotas to teams and individuals." },
    ],
  },
  {
    id: "incentive-plans",
    label: "Incentive Plan",
    banner: "Design incentive plans with earning and commission rules.",
    features: [
      { icon: IconPlan,       title: "Plan Design",     body: "Create incentive plans with earning rules, commission structures, and accelerators." },
      { icon: IconWorkflow,   title: "Rules Engine",    body: "Configure complex compensation logic through a flexible, governed rules framework." },
      { icon: IconGovernance, title: "Plan Governance", body: "Manage approvals, versioning, and assignment of compensation plans." },
    ],
    slides: [
      { file: "21_incentive-plans-plan-list.png",      caption: "View all incentive plans in a single list." },
      { file: "22_incentive-plans-create-plan.png",    caption: "Create a plan and add its basic information." },
      { file: "23_incentive-plans-create-plan.png",    caption: "Define earning rules that determine how participants earn." },
      { file: "24_incentive-plans-create-plan.png",    caption: "Configure commission rules and calculation logic." },
      { file: "25_incentive-plans-plan-approval.png",  caption: "Send the plan through its approval workflow." },
      { file: "26_incentive-plans-plan-assignment.png",caption: "Assign the approved plan to the relevant participants." },
    ],
  },
  {
    id: "statements",
    label: "Incentive Statements",
    banner: "Generate statements, manage disputes, and freeze payouts.",
    features: [
      { icon: IconStatement, title: "Statement Generation", body: "Generate detailed incentive statements that show earnings, attainment, and payout breakdowns." },
      { icon: IconDispute,   title: "Dispute Management",   body: "Allow participants to raise and track disputes through a structured resolution workflow." },
      { icon: IconScale,     title: "Freeze & Payout",      body: "Run the freeze and approval flow to lock statements and process payouts." },
    ],
    slides: [
      { file: "27_statement-incentive-statement-list.png",   caption: "Generate and view the list of incentive statements." },
      { file: "28_statement-incentive-statement-detail.png", caption: "Open a detailed statement to review earnings. From here, participants can raise disputes through the Dispute Management flow, and finance can run the Freeze and Approval flow for payouts." },
    ],
  },
  {
    id: "performance",
    label: "Performance Monitoring",
    banner: "Track attainment and performance in real time.",
    features: [
      { icon: IconAttainment,  title: "Attainment Tracking", body: "Monitor quota attainment in real time across teams, territories, and individuals." },
      { icon: IconPerformance, title: "Performance Graphs",  body: "Visualize performance trends with detailed graphs and drill-down capabilities." },
      { icon: IconAnomaly,     title: "Early Signals",       body: "Identify risks and opportunities before they impact compensation outcomes." },
    ],
    slides: [
      { file: "29_performance-tracking.png",            caption: "Monitor attainment and incentive performance as it happens." },
      { file: "30_performance-tracking-more-graphs.png",caption: "Drill into additional graphs for deeper performance insight." },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    banner: "Get a unified view of incentive performance.",
    features: [
      { icon: IconVisibility,  title: "Executive View",     body: "Get a unified dashboard summarizing incentive performance, attainment, and payout trends." },
      { icon: IconData,        title: "Widget Exploration", body: "Explore configurable widgets covering key metrics across the incentive lifecycle." },
      { icon: IconPerformance, title: "Real-Time Data",     body: "Dashboard data updates in real time so leaders always have current visibility." },
    ],
    slides: [
      { file: "31_dashboard-in-case-you-want-to-use-this.png",caption: "View the executive dashboard summarizing key incentive metrics." },
      { file: "32_dashboard-in-case-you-want-to-use-this.png",caption: "Explore dashboard widgets covering attainment, payouts, and trends." },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    banner: "Turn incentive data into business insight.",
    features: [
      { icon: IconWorkflow,   title: "Operational Reports", body: "Track calculations, disputes, and compensation cycle performance in detail." },
      { icon: IconForecast,   title: "Executive Analytics", body: "Monitor attainment, payouts, and compensation trends at the leadership level." },
      { icon: IconGovernance, title: "Custom Reports",      body: "Create reports tailored to your business and leadership needs." },
    ],
    slides: [
      { file: "35_reports.png", caption: "Build and explore reports and analytics across incentive performance, compensation spend, and organizational effectiveness." },
    ],
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    banner: "Ask anything. Understand everything.",
    features: [
      { icon: IconAssistant, title: "Natural Language Queries",  body: "Ask questions about quotas, earnings, plans, and performance in plain language." },
      { icon: IconSpark,     title: "Intelligent Explanations",  body: "Understand calculations, attainment, and payout drivers instantly." },
      { icon: IconForecast,  title: "Predictive Insights",       body: "Identify risks, opportunities, and likely outcomes before they happen." },
    ],
    slides: [
      { file: "33_ai-assistant.png",caption: "Use the AI Assistant to ask questions about quotas, earnings, plans, and performance in natural language." },
      { file: "34_ai-assistant.png",caption: "Get instant, intelligent explanations and insights across the incentive lifecycle." },
    ],
  },
];

/* ── Slide image with graceful placeholder ───────────────────────────── */

function SlideImage({ file, caption }: { file: string; caption: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [file]);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-light-green">
            <svg className="h-7 w-7 text-green/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <circle cx="9" cy="15" r="2" />
              <path d="M17 13l-3 3.5" />
            </svg>
          </div>
          <div>
            <p className="text-[11.5px] font-semibold text-slate/50">Screenshot pending</p>
            <p className="mt-0.5 font-mono text-[10px] text-slate/35">/public/product-tour/{file}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={`/product-tour/${file}`}
      alt={caption}
      fill
      className="object-contain"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

/* ── Feature highlight cards (same premium style as Capabilities detail) */

function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <article
            key={f.title}
            className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
            style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
          >
            <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />
            <div className="flex flex-1 flex-col p-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E8F5E9] text-[#00A651] transition-all duration-[250ms] ease-out group-hover/card:bg-[#00A651] group-hover/card:text-white">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#0B1D2D]">{f.title}</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">{f.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ── Arrow button ────────────────────────────────────────────────────── */

function ArrowBtn({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full",
        "border border-white/80 bg-white text-green shadow-float",
        "transition-all duration-200",
        "hover:bg-green hover:text-white hover:border-green hover:shadow-glow",
        "disabled:cursor-not-allowed disabled:opacity-30",
        direction === "left" ? "left-4" : "right-4",
      ].join(" ")}
    >
      {direction === "left" ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

/* ── Main carousel ───────────────────────────────────────────────────── */

export function TourCarousel() {
  const [tabIdx,       setTabIdx]       = useState(0);
  const [slideIdx,     setSlideIdx]     = useState(0);    // target (user intent)
  const [displayedIdx, setDisplayedIdx] = useState(0);    // what's visible in frame
  const [flipPhase,    setFlipPhase]    = useState<"idle" | "out" | "in-ready" | "in">("idle");
  const [flipDir,      setFlipDir]      = useState<1 | -1>(1);
  const [captionVisible, setCaptionVisible] = useState(true);
  const flipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tab         = TABS[tabIdx];
  const totalSlides = tab.slides.length;
  const displayed   = tab.slides[displayedIdx];

  /* Card flip CSS ──────────────────────────────────────────────────── */
  const flipStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    transform:
      flipPhase === "out"
        ? (flipDir === 1 ? "rotateY(-90deg)" : "rotateY(90deg)")
        : flipPhase === "in-ready"
        ? (flipDir === 1 ? "rotateY(90deg)"  : "rotateY(-90deg)")
        : "rotateY(0deg)",
    transition:
      flipPhase === "out" ? "transform 150ms ease-in"
      : flipPhase === "in" ? "transform 150ms ease-out"
      : "none",
    willChange: "transform",
  };

  /* Navigate with card flip ────────────────────────────────────────── */
  const navigateSlide = useCallback((next: number, dir: 1 | -1) => {
    if (next === slideIdx || flipPhase !== "idle") return;
    if (flipRef.current) clearTimeout(flipRef.current);

    setFlipDir(dir);
    setFlipPhase("out");

    // After flip-out (150ms): swap image, snap to "in-ready" start angle, then flip in
    flipRef.current = setTimeout(() => {
      setSlideIdx(next);
      setDisplayedIdx(next);
      setFlipPhase("in-ready");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipPhase("in");
          flipRef.current = setTimeout(() => {
            setFlipPhase("idle");
            flipRef.current = null;
          }, 160);
        });
      });
    }, 155);
  }, [slideIdx, flipPhase]);

  const prev = useCallback(() => {
    if (slideIdx > 0) navigateSlide(slideIdx - 1, -1);
  }, [slideIdx, navigateSlide]);

  const next = useCallback(() => {
    if (slideIdx < totalSlides - 1) navigateSlide(slideIdx + 1, 1);
  }, [slideIdx, totalSlides, navigateSlide]);

  /* Switch tab — instant ────────────────────────────────────────────── */
  const switchTab = useCallback((index: number) => {
    if (flipRef.current) clearTimeout(flipRef.current);
    setFlipPhase("idle");
    setTabIdx(index);
    setSlideIdx(0);
    setDisplayedIdx(0);
  }, []);

  /* Keyboard left / right arrows ────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* Caption fade — triggers when displayed content changes ───────────── */
  useEffect(() => {
    setCaptionVisible(false);
    const t = setTimeout(() => setCaptionVisible(true), 80);
    return () => clearTimeout(t);
  }, [displayedIdx, tabIdx]);

  /* Cleanup on unmount ───────────────────────────────────────────────── */
  useEffect(() => () => { if (flipRef.current) clearTimeout(flipRef.current); }, []);

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <section className="pt-8 pb-10 sm:pb-14">
      <div className="shell">

        {/* ── 1. Tab pills ── */}
        <div
          id="tour-tabs"
          className="flex justify-center overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          <div
            role="tablist"
            aria-label="Product tour sections"
            className="inline-flex gap-1 rounded-2xl"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,166,81,0.10)",
              boxShadow: "0 4px 16px rgba(15,45,36,0.08)",
              padding: "6px",
            }}
          >
            {TABS.map((t, i) => {
              const isActive = i === tabIdx;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => switchTab(i)}
                  className={[
                    "relative flex flex-col items-center whitespace-nowrap rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-[#00A651] text-white font-semibold"
                      : "bg-transparent text-[#475569] font-medium hover:bg-[#E8F5E9] hover:text-[#00A651]",
                  ].join(" ")}
                  style={{
                    padding: "6px 14px",
                    fontSize: "12.5px",
                    boxShadow: isActive ? "0 2px 8px rgba(0,166,81,0.25)" : "none",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "block",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      marginBottom: "3px",
                      background: isActive ? "rgba(255,255,255,0.8)" : "transparent",
                      transition: "background 200ms ease",
                      flexShrink: 0,
                    }}
                  />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab panel ── */}
        <div id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`}>

          {/* ── 2. Stage banner ── */}
          <div className="mt-5 flex items-center gap-3.5 rounded-xl border border-green/15 bg-light-green px-5 py-3.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-green" aria-hidden />
            <span className="eyebrow mr-3">Stage {tabIdx + 1} of {TABS.length}</span>
            <p className="text-[14.5px] font-semibold leading-snug text-dark-green">{tab.banner}</p>
          </div>

          {/* ── 3. Screenshot carousel ── */}
          <div className="mt-5">

            {/* Browser chrome frame */}
            <div className="overflow-hidden rounded-2xl border border-light-gray bg-white shadow-[0_8px_32px_rgba(15,45,36,0.12),0_2px_8px_rgba(15,45,36,0.06)]">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 border-b border-light-gray bg-[#F8FAFC] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} aria-hidden />
                <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-full border border-light-gray bg-white px-3 py-1 max-w-xs">
                  <svg className="h-2.5 w-2.5 shrink-0 text-slate/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="truncate text-[11px] text-slate/45">
                    app.incentiq.io / {tab.id}
                  </span>
                </div>
              </div>

              {/* Screenshot area — perspective enables 3D card flip */}
              <div
                className="relative aspect-[16/9] overflow-hidden bg-light-green/20"
                style={{ perspective: "1200px" }}
              >
                {/* Single flipping frame — image swaps at the 90° midpoint */}
                <div style={flipStyle}>
                  <SlideImage
                    key={`${tabIdx}-${displayedIdx}`}
                    file={displayed.file}
                    caption={displayed.caption}
                  />
                </div>

                <ArrowBtn
                  direction="left"
                  onClick={prev}
                  disabled={slideIdx === 0 || flipPhase !== "idle"}
                  label="Previous screenshot"
                />
                <ArrowBtn
                  direction="right"
                  onClick={next}
                  disabled={slideIdx === totalSlides - 1 || flipPhase !== "idle"}
                  label="Next screenshot"
                />
              </div>
            </div>

            {/* Step counter + dot indicators + caption */}
            <div className="mt-4 flex flex-col items-center gap-2.5">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-slate">
                Step {displayedIdx + 1} of {totalSlides}
              </p>

              <div className="flex items-center gap-1.5" role="group" aria-label="Screenshot navigation">
                {tab.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigateSlide(i, i > slideIdx ? 1 : -1)}
                    aria-label={`Go to step ${i + 1}`}
                    aria-current={i === displayedIdx ? "step" : undefined}
                    className={[
                      "rounded-full transition-all duration-300",
                      i === displayedIdx
                        ? "h-2 w-6 bg-green"
                        : "h-2 w-2 bg-light-gray hover:bg-green/40",
                    ].join(" ")}
                  />
                ))}
              </div>

              <p
                className="max-w-[640px] text-center text-[15px] font-medium leading-relaxed text-[#0B1D2D]"
                style={{ opacity: captionVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
                aria-live="polite"
                aria-atomic="true"
              >
                {displayed.caption}
              </p>
            </div>

          </div>

          {/* ── 4. Feature highlight cards ── */}
          <FeatureCards features={tab.features} />

        </div>
      </div>
    </section>
  );
}
