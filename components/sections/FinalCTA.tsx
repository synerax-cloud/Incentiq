import { Button } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { IconCheck, IconSpark } from "../ui/icons";
import { ServiceNowLogo, withLogo } from "../ui/ServiceNowLogo";

const assurances = ["Native to ServiceNow", "Enterprise governance", "AI-first by design", "No spreadsheets"];

export function FinalCTA() {
  return (
    <section id="demo" className="px-[var(--shell-px)] py-12 sm:py-14">
      <div className="mx-auto max-w-shell-wide">
        <Reveal>
          <div className="mesh grain relative overflow-hidden rounded-xl4 border border-white/60 px-7 py-14 text-center shadow-[0_24px_80px_rgba(11,29,45,0.14),0_4px_16px_rgba(11,29,45,0.06)] sm:px-16 sm:py-20">
            {/* ambient glow blobs */}
            <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-teal opacity-70 blur-[80px]" />
            <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-light-gray opacity-70 blur-[80px]" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-green opacity-80 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              {/* badge */}
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-light-green bg-white/80 px-4 py-1.5 text-[12px] font-semibold text-green shadow-soft backdrop-blur">
                  <IconSpark className="h-3.5 w-3.5" />
                  AI-first incentive compensation
                </span>
              </div>

              <h2 className="font-display text-display-1 font-bold text-dark-green text-balance">
                Build trust. Improve performance.{" "}
                <span className="text-gradient">Automate incentives.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-navy text-pretty">
                See how IncentIQ turns sales compensation into a transparent, intelligent, governed workflow — built natively on <ServiceNowLogo size="md" />.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <Button href="/book-demo" variant="primary" className="px-7 py-3.5 text-base">
                  Request a demo
                </Button>
                <Button href="/platform" variant="secondary" className="px-7 py-3.5 text-base">
                  Explore the platform
                </Button>
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {assurances.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-medium text-navy">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-green">
                      <IconCheck className="h-2.5 w-2.5 text-white" />
                    </span>
                    {withLogo(a, "sm")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
