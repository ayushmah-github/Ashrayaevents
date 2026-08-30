import AdminShell from "@/components/admin/AdminShell";
import AboutSectionEditor from "@/components/admin/AboutSectionEditor";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/lib/admin/resources";

/**
 * Curated dashboard for the public /how-it-works page: the journey headline,
 * the 4-step planning journey (grouped by step number into tabs), and the
 * "Meet Your Team" role cards.
 */
export default function HowItWorksEditorPage() {
  return (
    <AdminShell active="how-it-works-editor">
      <h1 className="font-serif text-4xl text-maroon">How It Works Editor</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        The top banner image/title is managed under <strong>Page Banners</strong> →
        page “How It Works”. Everything below that lives here.
      </p>

      <div className="mt-8 space-y-6">
        <AboutSectionEditor
          sectionKey="how_it_works_hero"
          title="Journey Headline"
          fields={[
            { name: "title", label: "Headline" },
            { name: "subtitle", label: "Subheadline", type: "textarea" },
          ]}
        />

        <Divider label="The 4-Step Journey" />
        <p className="-mt-2 text-sm text-ink-soft">
          Give phases in the same step the same <strong>step number</strong> (1–4) and{" "}
          <strong>step title</strong> — they'll group together as one tab on the
          public page, in the order set by “Order”.
        </p>
        <ResourceManager resource={RESOURCES.process_phases} />

        <Divider label="Meet Your Team (roles)" />
        <ResourceManager resource={RESOURCES.role_cards} />
      </div>
    </AdminShell>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
        {label}
      </span>
      <div className="h-px flex-1 bg-maroon/10" />
    </div>
  );
}
