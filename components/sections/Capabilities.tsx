import { SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import {
  IconOrg, IconBusinessUnit, IconQuota, IconPerformance,
  IconStatement, IconDispute, IconPlan, IconAssistant, IconSpark,
} from "../ui/icons";

const standard = [
  { icon: IconOrg, title: "Organization Management", body: "Manage hierarchies, territories, reporting relationships, and participant assignments from a single source of truth that adapts as your business evolves." },
  { icon: IconBusinessUnit, title: "Business Unit Management", body: "Run distinct compensation structures per business unit while keeping governance centralized." },
  { icon: IconQuota, title: "Quota Management", body: "Create, distribute, and manage quotas across territories, teams, and individuals while maintaining transparency and accountability." },
  { icon: IconPerformance, title: "Performance Tracking", body: "Monitor attainment, incentive performance, and compensation outcomes with real-time visibility across the organization." },
  { icon: IconStatement, title: "Statements", body: "Deliver transparent compensation statements that help sellers understand earnings and reduce payout disputes." },
  { icon: IconDispute, title: "Dispute Resolution", body: "Manage disputes, exceptions, and inquiries through a structured workflow that improves accountability and reduces operational effort." },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-light-green py-14 sm:py-16">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title={<>Everything incentive operations need, <span className="text-gradient">in one place.</span></>}
            description="From org modeling to AI-assisted answers for reps, IncentIQ covers the full incentive lifecycle on a single platform."
          />
        </Reveal>

        {/* featured row */}
        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Incentive Plans card */}
          <RevealItem>
            <article className="card group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-6 sm:flex-row sm:items-center">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-light-green/60 blur-3xl" />
              <div className="relative max-w-xs">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green text-white shadow-soft">
                  <IconPlan className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-display-3 font-bold text-dark-green">Incentive Plans</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">Build compensation plans that align seller behaviour with business objectives using a flexible and governed rules framework.</p>
              </div>
              {/* tier chart mini */}
              <div className="relative flex items-end gap-2 self-stretch rounded-2xl bg-white/80 p-4 ring-1 ring-light-gray sm:w-44">
                {[38, 56, 72, 100].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full flex-1 items-end" style={{ minHeight: 90 }}>
                      <div
                        className="w-full rounded-md"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #0F2E24, #00A651 ${h}%, #7ED321)`,
                          opacity: 0.7 + i * 0.08,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate">{["1×","1.2×","1.4×","1.6×"][i]}</span>
                  </div>
                ))}
                <span className="absolute left-3 top-3 text-[10px] font-semibold text-slate/70">Accelerators</span>
              </div>
            </article>
          </RevealItem>

          {/* AI Assistant card */}
          <RevealItem>
            <article className="card group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-6 sm:flex-row sm:items-center">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-light-green/60 blur-3xl" />
              <div className="relative max-w-xs">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green text-white shadow-soft">
                  <IconAssistant className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-display-3 font-bold text-dark-green">AI Assistant</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">Leverage AI to answer compensation questions, explain earnings, forecast outcomes, and surface actionable insights across the incentive lifecycle.</p>
              </div>
              {/* chat mini */}
              <div className="relative flex flex-col justify-between self-stretch rounded-2xl bg-white/80 p-4 ring-1 ring-light-gray sm:w-52">
                <span className="mb-3 text-[10px] font-semibold text-slate/70">AI assistant</span>
                <div className="space-y-2.5">
                  <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-light-gray px-3 py-1.5 text-[11px] leading-snug text-dark-green">
                    How do I hit top tier?
                  </div>
                  <div className="flex items-start gap-1.5 rounded-xl rounded-tl-sm border border-light-green bg-light-green px-3 py-2 text-[11px] leading-snug text-navy">
                    <IconSpark className="mt-0.5 h-3 w-3 shrink-0 text-green" />
                    <span>Close $48K more — you&apos;re 93% there. Focus on Q4 renewal deals.</span>
                  </div>
                  <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-light-gray px-3 py-1.5 text-[11px] leading-snug text-dark-green">
                    When does this quarter end?
                  </div>
                </div>
              </div>
            </article>
          </RevealItem>
        </RevealGroup>

        {/* standard grid */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {standard.map((c) => (
            <RevealItem key={c.title}>
              <article className="card group flex h-full flex-col p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-light-green text-dark-green ring-1 ring-light-green transition-all duration-300 group-hover:bg-green group-hover:text-white group-hover:shadow-soft">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[15.5px] font-semibold text-dark-green">{c.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate">{c.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
