import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/lib/admin/resources";

/**
 * Curated dashboard for the city / destination landing pages
 * (e.g. /wedding-planner-in-delhi-ncr) — the page itself, its content blocks
 * and its FAQs, all in one place.
 */
export default function DestinationPagesEditorPage() {
  return (
    <AdminShell active="destination-pages-editor">
      <h1 className="font-serif text-4xl text-maroon">Destination Pages</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        One page per city, each living at its own URL (e.g.{" "}
        <code>/wedding-planner-in-delhi-ncr</code>). Create the page first — it
        needs a unique <strong>slug</strong> — then add its content blocks and
        FAQs below, picking the matching city from the dropdown.
      </p>

      <div className="mt-8 space-y-6">
        <Divider label="City Pages" />
        <ResourceManager resource={RESOURCES.destination_pages} />

        <Divider label="Content Blocks" />
        <p className="-mt-2 text-sm text-ink-soft">
          Each block is one section on the page, shown in <strong>Order</strong>.
          The <strong>Layout</strong> field controls how it looks: plain text, a
          bullet list, text beside an image (left or right), or a highlighted
          band.
        </p>
        <ResourceManager resource={RESOURCES.destination_page_blocks} />

        <Divider label="FAQs" />
        <ResourceManager resource={RESOURCES.destination_page_faqs} />
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
