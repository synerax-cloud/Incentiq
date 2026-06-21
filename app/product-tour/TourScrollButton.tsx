"use client";

export function TourScrollButton() {
  return (
    <div className="mt-8">
      <button
        onClick={() =>
          document.getElementById("tour-tabs")?.scrollIntoView({ behavior: "smooth" })
        }
        className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_2px_10px_rgba(15,46,36,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,166,81,0.40)]"
        style={{ backgroundColor: "#00A651" }}
      >
        Let&apos;s get started
        <span aria-hidden>↓</span>
      </button>
    </div>
  );
}
