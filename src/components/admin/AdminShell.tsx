import Link from "next/link";
import { RESOURCES } from "@/lib/admin/resources";
import LogoutButton from "./LogoutButton";

/** Sidebar + top bar used by all authenticated admin pages. */
export default function AdminShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-none flex-col bg-maroon-dark p-6 text-cream md:flex">
        <Link href="/admin" className="font-serif text-2xl">
          Ashraya <span className="text-gold">Admin</span>
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <SideLink href="/admin" label="Dashboard" active={active === "dashboard"} />
          <div className="my-3 h-px bg-cream/10" />
          {Object.values(RESOURCES).map((r) => (
            <SideLink
              key={r.table}
              href={`/admin/${r.table}`}
              label={r.label}
              active={active === r.table}
            />
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3 border-t border-cream/10 pt-5">
          <Link href="/" target="_blank" className="text-xs text-cream/70 hover:text-gold">
            View website ↗
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-cream">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between bg-maroon-dark px-5 py-3 text-cream md:hidden">
          <Link href="/admin" className="font-serif text-lg">
            Ashraya Admin
          </Link>
          <LogoutButton />
        </div>
        <div className="p-6 sm:p-10">{children}</div>
      </main>
    </div>
  );
}

function SideLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? "bg-maroon text-cream" : "text-cream/80 hover:bg-maroon/60 hover:text-cream"
      }`}
    >
      {label}
    </Link>
  );
}
