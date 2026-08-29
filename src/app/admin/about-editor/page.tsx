import AdminShell from "@/components/admin/AdminShell";
import AboutSectionEditor from "@/components/admin/AboutSectionEditor";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/lib/admin/resources";

/**
 * Curated single-page dashboard for everything on the public /about page:
 * Hero, Brand Story and CTA copy (each with its own draft/publish toggle +
 * SEO fields), plus embedded managers for Core Values, Stats, Team and
 * Testimonials — all in one place instead of hunting across separate pages.
 */
export default function AboutEditorPage() {
  return (
    <AdminShell active="about-editor">
      <h1 className="font-serif text-4xl text-maroon">About Page Editor</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Everything shown on <code>/about</code> lives here. Each section has its
        own <strong>Published / Draft</strong> switch — toggle a section to Draft
        to hide it from visitors while you're still working on it, without
        affecting the rest of the page.
      </p>

      <div className="mt-8 space-y-6">
        <AboutSectionEditor
          sectionKey="about_hero"
          title="Hero Banner"
          showSeo
          fields={[
            { name: "title", label: "Headline" },
            { name: "subtitle", label: "Subheadline", type: "textarea" },
            { name: "media_url", label: "Background image / video poster", type: "image" },
          ]}
        />

        <AboutSectionEditor
          sectionKey="about_story"
          title="Brand Story"
          fields={[
            { name: "title", label: "Heading" },
            { name: "body_markdown", label: "Story text", type: "textarea", help: "Plain text or Markdown." },
            { name: "media_url", label: "Story image", type: "image" },
          ]}
        />

        <AboutSectionEditor
          sectionKey="about_cta"
          title="Call-to-Action Banner"
          fields={[
            { name: "title", label: "Heading" },
            { name: "subtitle", label: "Supporting text", type: "textarea" },
          ]}
        />

        <Divider label="Metrics & Achievements" />
        <ResourceManager resource={RESOURCES.about_stats} />

        <Divider label="Core Values" />
        <ResourceManager resource={RESOURCES.core_values} />

        <Divider label="Leadership & Team" />
        <ResourceManager resource={RESOURCES.team_members} />

        <Divider label="Client Testimonials" />
        <p className="-mt-2 text-sm text-ink-soft">
          Tick <strong>“Feature on About page”</strong> on the testimonials you want to
          show here (all testimonials still appear on the main Testimonials page).
        </p>
        <ResourceManager resource={RESOURCES.testimonials} />
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
