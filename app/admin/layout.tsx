import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IncentNow Admin",
  description: "Admin dashboard for IncentNow",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
