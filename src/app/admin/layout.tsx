import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ashraya Events — Admin",
  robots: { index: false, follow: false },
};

/** Thin wrapper — the sidebar chrome lives in <AdminShell> so the login page
 *  (which shouldn't show the sidebar) can opt out. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand/40 text-ink">{children}</div>;
}
