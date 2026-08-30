import type { RoleCard } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

/** "Meet Your Team" — generic role cards (no photos), used on How It Works. */
export default function RoleCards({ roles }: { roles: RoleCard[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
      {roles.map((role, i) => (
        <Reveal key={role.title} delayIndex={i}>
          <div className="flex h-full flex-col items-center gap-3 rounded-[var(--radius-xl2)] bg-white p-7 text-center shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-serif text-lg text-gold-dark">
              {role.title.charAt(0)}
            </div>
            <h3 className="text-lg text-maroon">{role.title}</h3>
            <p className="leading-relaxed text-ink-soft">{role.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
