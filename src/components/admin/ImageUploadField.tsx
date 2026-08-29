"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/admin/upload-client";

/** Standalone image upload control (compresses client-side before upload). */
export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadFile(file));
    } catch {
      alert("Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-20 rounded-lg object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-sand text-xs text-ink-soft">
            No image
          </div>
        )}
        <label className="cursor-pointer rounded-full border border-maroon/30 px-4 py-2 text-sm font-medium text-maroon hover:bg-maroon hover:text-cream">
          {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={pick} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
