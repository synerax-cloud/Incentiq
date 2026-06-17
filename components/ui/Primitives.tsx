import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow, IconSpark } from "./icons";

/* ---------------- Pill label ---------------- */

export function Pill({
  children,
  icon = true,
}: {
  children: ReactNode;
  icon?: boolean;
}) {
  return (
    <span className="pill">
      {icon ? (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-green text-white shadow-[0_1px_4px_rgba(0,166,81,0.3)]">
          <IconSpark className="h-3 w-3" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  tone = "ink",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      <span
        className={`eyebrow ${tone === "light" ? "text-sky" : "text-green"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-display-2 font-bold text-balance ${
          tone === "light" ? "text-white" : "text-dark-green"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-lead text-pretty ${
            tone === "light" ? "text-white/70" : "text-slate"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------- Buttons ---------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  withArrow?: boolean;
  className?: string;
};

// Hex values are hardcoded so token purge / config issues can never break visibility.
const styles: Record<string, string> = {
  primary:
    "bg-[#00A651] text-white hover:bg-[#0F2E24] shadow-[0_2px_10px_rgba(15,46,36,0.18)] hover:shadow-[0_10px_28px_rgba(0,166,81,0.30)]",
  secondary:
    "bg-white text-[#0B1D2D] ring-1 ring-[#475569]/25 backdrop-blur hover:ring-[#00A651] hover:text-[#00A651] shadow-soft",
  ghost:
    "text-[#0B1D2D] hover:text-[#00A651]",
};

// Inline-style fallback for primary — beats any class-level override.
const primaryInline: React.CSSProperties = {
  backgroundColor: "#00A651",
  color: "#FFFFFF",
};

export function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      style={variant === "primary" ? primaryInline : undefined}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.92rem] font-semibold transition-all duration-300",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
      {withArrow ? (
        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}
