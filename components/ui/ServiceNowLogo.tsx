import type { ReactNode } from "react";

const STORE_URL = "https://store.servicenow.com/store/app/3bff6c3997210f1876b932471153af36";

const boldStyle: React.CSSProperties = { color: "#0B1D2D", fontWeight: 700 };

export function ServiceNowLogo({ size: _size }: { size?: string }) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...boldStyle, textDecoration: "none" }}
    >
      ServiceNow
    </a>
  );
}

export function withLogo(text: string, _size?: string): ReactNode {
  const parts = text.split("ServiceNow");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <strong style={boldStyle}>ServiceNow</strong>
          )}
        </span>
      ))}
    </>
  );
}
