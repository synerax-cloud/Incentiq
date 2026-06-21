import type { ReactNode } from "react";

export function ServiceNowLogo({ size: _size }: { size?: string }) {
  return (
    <span
      className="servicenow-logo"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 700,
        fontSize: "inherit",
        lineHeight: "1",
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
        fontFamily:
          "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <span style={{ display: "inline" }}>servicen</span>

      <span style={{ color: "#62BB46" }}>o</span>

      <span style={{ display: "inline" }}>
        w
        <span
          aria-hidden
          className="servicenow-trademark"
          style={{
            fontSize: "0.5em",
            marginLeft: "0.05em",
            fontWeight: 700,
            display: "inline",
            color: "inherit",
          }}
        >
          ®
        </span>
      </span>
    </span>
  );
}

export function withLogo(text: string, _size?: string): ReactNode {
  const parts = text.split("ServiceNow");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} style={{ display: "inline" }}>
          {part}
          {i < parts.length - 1 && <ServiceNowLogo />}
        </span>
      ))}
    </>
  );
}
