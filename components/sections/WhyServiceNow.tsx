import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { ServiceNowFlow } from "../visuals/ServiceNowFlow";
import { ServiceNowLogo } from "../ui/ServiceNowLogo";
import {
  IconGovernance, IconSecurity, IconWorkflow, IconScale, IconData, IconLowCode,
} from "../ui/icons";

const pillars = [
  { icon: IconGovernance, title: "Enterprise governance", body: "Policy, approvals, and audit trails are native to every workflow." },
  { icon: IconSecurity, title: "Security & compliance", body: "Enterprise-grade access controls inherited from the Now Platform." },
  { icon: IconWorkflow, title: "Workflow automation", body: "Seamless automation and approvals across the incentive lifecycle." },
  { icon: IconScale, title: "Scalability", body: "Built for global sales teams and complex compensation structures." },
  { icon: IconData, title: "Unified data architecture", body: "A single metrics layer with reporting tuned for analytics performance." },
  { icon: IconLowCode, title: "Low-code extensibility", body: "Rapid deployment and integration with CRM, ERP, HRMS, and warehouses." },
];

export function WhyServiceNow() {
  return (
    <section id="servicenow" className="relative overflow-hidden py-14 sm:py-16">
      {/* layered background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-light-green/60 via-white to-white" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-light-green opacity-60 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-teal opacity-40 blur-[100px]" />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="WHY SERVICENOW"
            title={<>Built on the power of <ServiceNowLogo size="xl" />.</>}
            description="IncentIQ doesn't sit beside your systems — it runs inside the Now Platform. Governance, security, and scale come standard, so incentives inherit the same trust as the rest of the enterprise."
          />
        </Reveal>

        <Reveal delay={0.12} y={28} className="mt-10">
          <ServiceNowFlow />
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <RevealItem key={p.title}>
              <div className="group flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-green shadow-soft ring-1 ring-light-gray transition-all duration-300 group-hover:bg-green group-hover:text-white group-hover:shadow-float">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold tracking-tight text-dark-green">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate">{p.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
