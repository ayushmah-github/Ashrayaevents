"use client";

import { useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";

type SectionData = {
  title: string;
  subtitle: string;
  body_markdown: string;
  media_url: string;
  gallery_images: string[];
  cta_label: string;
  cta_url: string;
  seo_title: string;
  seo_description: string;
  is_published: boolean;
};

const EMPTY: SectionData = {
  title: "",
  subtitle: "",
  body_markdown: "",
  media_url: "",
  gallery_images: [],
  cta_label: "",
  cta_url: "",
  seo_title: "",
  seo_description: "",
  is_published: true,
};

/**
 * One editable "section" of the About page (Hero / Story / CTA), each with its
 * own draft/publish toggle and SEO fields — talks to
 * /api/admin/page-content/[section_key].
 */
export default function AboutSectionEditor({
  sectionKey,
  title,
  fields,
  showSeo,
}: {
  sectionKey: string;
  title: string;
  fields: {
    name: keyof SectionData;
    label: string;
    type?: "text" | "textarea" | "image" | "imagelist";
    help?: string;
  }[];
  showSeo?: boolean;
}) {
  const [data, setData] = useState<SectionData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/page-content/${sectionKey}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data) {
          setData({
            title: res.data.title || "",
            subtitle: res.data.subtitle || "",
            body_markdown: res.data.body_markdown || "",
            media_url: res.data.media_url || "",
            gallery_images: Array.isArray(res.data.gallery_images) ? res.data.gallery_images : [],
            cta_label: res.data.cta_label || "",
            cta_url: res.data.cta_url || "",
            seo_title: res.data.seo_title || "",
            seo_description: res.data.seo_description || "",
            is_published: res.data.is_published !== false,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [sectionKey]);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/page-content/${sectionKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)]">
        <p className="text-sm text-ink-soft">Loading…</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl text-maroon">{title}</h2>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={data.is_published}
            onChange={(e) => setData((d) => ({ ...d, is_published: e.target.checked }))}
            className="h-4 w-4 accent-maroon"
          />
          {data.is_published ? "Published (live)" : "Draft (hidden)"}
        </label>
      </div>

      <div className="mt-5 space-y-5">
        {fields.map((f) => (
          <div key={f.name}>
            {f.type === "image" ? (
              <ImageUploadField
                label={f.label}
                value={data[f.name] as string}
                onChange={(v) => setData((d) => ({ ...d, [f.name]: v }))}
              />
            ) : f.type === "imagelist" ? (
              <>
                <label className="mb-1.5 block text-sm font-medium text-ink">{f.label}</label>
                <GalleryInput
                  value={data[f.name] as string[]}
                  onChange={(v) => setData((d) => ({ ...d, [f.name]: v }))}
                />
                {f.help && <p className="mt-1 text-xs text-ink-soft">{f.help}</p>}
              </>
            ) : (
              <>
                <label className="mb-1.5 block text-sm font-medium text-ink">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={5}
                    value={data[f.name] as string}
                    onChange={(e) => setData((d) => ({ ...d, [f.name]: e.target.value }))}
                    className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-gold"
                  />
                ) : (
                  <input
                    value={data[f.name] as string}
                    onChange={(e) => setData((d) => ({ ...d, [f.name]: e.target.value }))}
                    className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-gold"
                  />
                )}
                {f.help && <p className="mt-1 text-xs text-ink-soft">{f.help}</p>}
              </>
            )}
          </div>
        ))}

        {showSeo && (
          <div className="rounded-xl border border-dashed border-maroon/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              SEO (this section)
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">Meta title</label>
                <input
                  value={data.seo_title}
                  onChange={(e) => setData((d) => ({ ...d, seo_title: e.target.value }))}
                  className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">Meta description</label>
                <textarea
                  rows={2}
                  value={data.seo_description}
                  onChange={(e) => setData((d) => ({ ...d, seo_description: e.target.value }))}
                  className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && <span className="text-sm text-green-700">Saved ✓</span>}
      </div>
    </div>
  );
}

/** Ordered list of photos for a gallery-style field (e.g. the About hero grid). */
function GalleryInput({ value, onChange }: { value?: string[]; onChange: (v: string[]) => void }) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-3">
      {items.map((url, i) => (
        <div key={i} className="rounded-xl border border-maroon/10 p-3">
          <ImageUploadField
            label={`Photo ${i + 1}`}
            value={url}
            onChange={(v) => {
              const next = [...items];
              next[i] = v;
              onChange(next);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Remove this photo
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-sm font-medium text-gold-dark hover:text-maroon"
      >
        + Add photo
      </button>
    </div>
  );
}
