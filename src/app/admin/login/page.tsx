"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[var(--shadow-soft)]"
    >
      <p className="font-serif text-3xl text-maroon">
        Ashraya <span className="text-gold">Admin</span>
      </p>
      <p className="mt-2 text-sm text-ink-soft">Sign in to manage your website.</p>

      <label className="mt-6 block text-sm font-medium">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        className="mt-1.5 w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-gold"
      />

      <label className="mt-4 block text-sm font-medium">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-gold"
      />

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-maroon py-3 text-sm font-semibold text-cream hover:bg-maroon-dark disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
