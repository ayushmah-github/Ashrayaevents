import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { RESOURCES } from "@/lib/admin/resources";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminDashboard() {
  return (
    <AdminShell active="dashboard">
      <h1 className="font-serif text-4xl text-maroon">Welcome back 🌸</h1>
      <p className="mt-2 text-ink-soft">
        Manage everything on your website from here — add or edit content, and it
        updates live.
      </p>

      {!isSupabaseConfigured && (
        <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm text-ink">
          <strong>Almost ready.</strong> Connect your database to start saving
          content: set the <code>NEXT_PUBLIC_SUPABASE_URL</code> and key env vars,
          and run <code>supabase/schema.sql</code> in your Supabase project. Until
          then the website shows sample content.
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(RESOURCES).map((r) => (
          <Link
            key={r.table}
            href={`/admin/${r.table}`}
            className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <p className="font-serif text-2xl text-maroon">{r.label}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {r.singleton ? "Edit your homepage & site details" : `Add and edit ${r.label.toLowerCase()}`}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-gold-dark">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
