import AdminShell from "@/components/admin/AdminShell";
import AboutSectionEditor from "@/components/admin/AboutSectionEditor";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/lib/admin/resources";

/**
 * Curated dashboard for the public /how-it-works page: hero banner, intro
 * headline + primary CTA, the 4-step journey (steps, each with nested content
 * items), and the "Meet Your Team" role cards.
 */
export default function HowItWorksEditorPage() {
  return (
    <AdminShell active="how-it-works-editor">
      <h1 className="font-serif text-4xl text-maroon">How It Works Editor</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Everything shown on <code>/how-it-works</code> lives here, top to bottom.
        Turning the <strong>Hero</strong> section to Draft takes the whole page
        offline (visitors see a 404); the other sections can be hidden
        independently without affecting the rest of the page.
      </p>

      <div className="mt-8 space-y-6">
        <AboutSectionEditor
          sectionKey="how_it_works_hero"
          title="Hero Banner"
          showSeo
          fields={[
            { name: "title", label: "Headline (e.g. \"How it works\")" },
            { name: "subtitle", label: "Subheadline (optional)", type: "textarea" },
            { name: "media_url", label: "Background image", type: "image" },
          ]}
        />

        <AboutSectionEditor
          sectionKey="how_it_works_intro"
          title="Intro & Primary CTA"
          fields={[
            { name: "title", label: "Intro heading" },
            { name: "subtitle", label: "Intro subheading", type: "textarea" },
            { name: "cta_label", label: "Primary CTA button text" },
            { name: "cta_url", label: "CTA link (optional — leave blank to open the enquiry form)" },
          ]}
        />

        <Divider label="The 4-Step Journey" />
        <p className="-mt-2 text-sm text-ink-soft">
          Add each step here first (it needs a unique <strong>slug</strong> for its
          anchor link), then add its content items below and pick the matching
          step from the dropdown.
        </p>
        <ResourceManager resource={RESOURCES.how_it_works_steps} />
        <ResourceManager resource={RESOURCES.how_it_works_step_items} />

        <Divider label="Meet Your Team" />
        <AboutSectionEditor
          sectionKey="how_it_works_team"
          title="Team Section Heading"
          fields={[
            { name: "title", label: "Heading (e.g. \"Meet Your Team\")" },
            { name: "subtitle", label: "Subheading", type: "textarea" },
          ]}
        />
        <ResourceManager resource={RESOURCES.how_it_works_team_roles} />
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
