import AdminShell from "@/components/admin/AdminShell";
import AboutSectionEditor from "@/components/admin/AboutSectionEditor";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/lib/admin/resources";

/**
 * Curated single-page dashboard for everything on the public /about page —
 * a narrative journey (Hero, Founder, Approach, Personal by Design, Journey,
 * Recognitions, Destinations, CTA), each text section with its own
 * Published/Draft switch and SEO fields, plus embedded managers for the
 * list-style sections (Recognitions, Destinations).
 */
export default function AboutEditorPage() {
  return (
    <AdminShell active="about-editor">
      <h1 className="font-serif text-4xl text-maroon">About Page Editor</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Everything shown on <code>/about</code> lives here, top to bottom. Each
        text section has its own <strong>Published / Draft</strong> switch — toggle
        a section to Draft to hide it from visitors while you're still working on
        it, without affecting the rest of the page.
      </p>

      <div className="mt-8 space-y-6">
        <AboutSectionEditor
          sectionKey="about_hero"
          title="Hero"
          showSeo
          fields={[
            { name: "title", label: "Headline (e.g. \"About Us\")" },
            { name: "subtitle", label: "Intro paragraph (shown under the headline)", type: "textarea" },
            {
              name: "gallery_images",
              label: "Hero gallery photos (grid at the very top of the page)",
              type: "imagelist",
              help: "Add several photos to show a photo grid at the top, like Shaandaar's — one photo shows as a single wide banner instead. Leave empty to use the background image below.",
            },
            { name: "media_url", label: "Fallback banner image (used only if the gallery above is empty)", type: "image" },
          ]}
        />

        <Divider label="Founders (add one row per founder — Ashraya has two)" />
        <ResourceManager resource={RESOURCES.founders} />

        <AboutSectionEditor
          sectionKey="about_approach"
          title="Our Approach"
          fields={[
            { name: "title", label: "Heading" },
            { name: "body_markdown", label: "Body text", type: "textarea" },
          ]}
        />

        <AboutSectionEditor
          sectionKey="about_personal"
          title="Personal by Design"
          fields={[
            { name: "title", label: "Heading" },
            { name: "body_markdown", label: "Body text", type: "textarea" },
          ]}
        />

        <AboutSectionEditor
          sectionKey="about_journey"
          title="Our Journey"
          fields={[
            { name: "title", label: "Heading" },
            { name: "body_markdown", label: "Body text (the origin story)", type: "textarea" },
            { name: "media_url", label: "Image (optional)", type: "image" },
          ]}
        />

        <Divider label="Recognised Excellence (Awards)" />
        <ResourceManager resource={RESOURCES.recognitions} />

        <Divider label="Destinations We Cover" />
        <ResourceManager resource={RESOURCES.destinations} />

        <AboutSectionEditor
          sectionKey="about_cta"
          title="Call-to-Action Banner"
          fields={[
            { name: "title", label: "Heading" },
            { name: "subtitle", label: "Supporting text", type: "textarea" },
          ]}
        />
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
