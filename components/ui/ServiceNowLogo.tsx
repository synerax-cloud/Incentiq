import type { ReactNode } from "react";

export function ServiceNowLogo({ size: _size }: { size?: string }) {
  return <strong style={{ color: "#0B1D2D", fontWeight: 700 }}>ServiceNow</strong>;
}

export function withLogo(text: string, _size?: string): ReactNode {
  const parts = text.split("ServiceNow");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong style={{ color: "#0B1D2D", fontWeight: 700 }}>ServiceNow</strong>}
        </span>
      ))}
    </>
  );
}
