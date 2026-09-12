import Image from "next/image";
import type { HowItWorksTeamRole } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ValueIcon from "@/components/shared/ValueIcon";

/** "Meet Your Team" — role cards with a photo, or an icon when none is set. */
export default function RoleCards({ roles }: { roles: HowItWorksTeamRole[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
      {roles.map((role, i) => (
        <Reveal key={role.title} delayIndex={i}>
          <div className="flex h-full flex-col items-center gap-3 rounded-[var(--radius-xl2)] bg-white p-7 text-center shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)]">
            {role.image ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image src={role.image} alt={role.title} fill sizes="64px" className="object-cover" />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <ValueIcon name={role.icon} className="h-6 w-6" />
              </div>
            )}
            <h3 className="text-lg text-maroon">{role.title}</h3>
            <p className="leading-relaxed text-ink-soft">{role.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
