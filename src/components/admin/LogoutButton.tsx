"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="rounded-full border border-cream/30 px-4 py-1.5 text-xs font-semibold text-cream/90 hover:bg-cream/10"
    >
      Log out
    </button>
  );
}
