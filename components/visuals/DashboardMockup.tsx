import Image from "next/image";

export function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl3 border border-light-gray bg-white shadow-float",
        className,
      ].join(" ")}
    >
      {/* Browser chrome */}
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
            app.incentiq.io / dashboard
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <Image
        src="/product-tour/31_dashboard-in-case-you-want-to-use-this.png"
        alt="IncentIQ dashboard overview"
        width={1920}
        height={1080}
        className="block w-full h-auto"
        priority
        unoptimized
      />
    </div>
  );
}
