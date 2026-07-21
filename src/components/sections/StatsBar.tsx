import { getSiteSettings } from "@/lib/cms/content";
import Reveal from "@/components/ui/Reveal";

/** Row of headline stats (managed in Site Settings). */
export default async function StatsBar() {
  const { stats = [] } = await getSiteSettings();
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delayIndex={i} className="text-center">
          <p className="font-serif text-4xl text-gold-dark sm:text-5xl">{s.value}</p>
          <p className="mt-2 text-sm uppercase tracking-wider text-ink-soft">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
