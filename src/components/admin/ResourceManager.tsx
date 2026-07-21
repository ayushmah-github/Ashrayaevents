"use client";

import { useCallback, useEffect, useState } from "react";
import type { Field, Resource } from "@/lib/admin/resources";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

export default function ResourceManager({ resource }: { resource: Resource }) {
  const { table, singleton } = resource;
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [notReady, setNotReady] = useState(false);
  const [editing, setEditing] = useState<Row | "new" | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${table}`);
      if (res.status === 503) {
        setNotReady(true);
        return;
      }
      const data = await res.json();
      const list: Row[] = data.data || [];
      setRows(list);
      if (singleton) setEditing(list[0] ?? { id: 1 });
    } finally {
      setLoading(false);
    }
  }, [table, singleton]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p className="text-ink-soft">Loading…</p>;

  if (notReady) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold/10 p-6 text-sm">
        <strong>Database not connected yet.</strong> Set your Supabase env vars and
        run <code>supabase/schema.sql</code>, then reload. Until then the website
        shows built-in sample content.
      </div>
    );
  }

  // Singleton (Site Settings) — a single always-visible form.
  if (singleton && editing && editing !== "new") {
    return (
      <div>
        <h1 className="font-serif text-4xl text-maroon">{resource.label}</h1>
        <p className="mt-1 text-ink-soft">Edit your homepage and site details.</p>
        <div className="mt-8">
          <RecordForm
            resource={resource}
            initial={editing}
            onDone={load}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-maroon">{resource.label}</h1>
          <p className="mt-1 text-ink-soft">{rows.length} item{rows.length === 1 ? "" : "s"}</p>
        </div>
        {editing === null && (
          <button
            onClick={() => setEditing("new")}
            className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark"
          >
            + Add {resource.singular.toLowerCase()}
          </button>
        )}
      </div>

      {editing !== null ? (
        <div className="mt-8">
          <RecordForm
            resource={resource}
            initial={editing === "new" ? {} : editing}
            onDone={() => {
              setEditing(null);
              load();
            }}
            onCancel={() => setEditing(null)}
          />
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {rows.length === 0 && (
            <li className="rounded-2xl bg-white p-6 text-ink-soft">
              Nothing here yet. Click “Add {resource.singular.toLowerCase()}”.
            </li>
          )}
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)]"
            >
              {resource.imageField && row[resource.imageField] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row[resource.imageField]}
                  alt=""
                  className="h-14 w-14 flex-none rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-sand text-gold-dark">
                  ✦
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{row[resource.titleField]}</p>
                {resource.subtitleField && (
                  <p className="truncate text-sm text-ink-soft">{row[resource.subtitleField]}</p>
                )}
              </div>
              <button
                onClick={() => setEditing(row)}
                className="rounded-full border border-maroon/30 px-4 py-1.5 text-sm font-medium text-maroon hover:bg-maroon hover:text-cream"
              >
                Edit
              </button>
              <DeleteButton table={table} id={row.id} onDone={load} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DeleteButton({ table, id, onDone }: { table: string; id: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  async function del() {
    if (!confirm("Delete this item? This can't be undone.")) return;
    setBusy(true);
    await fetch(`/api/admin/${table}/${id}`, { method: "DELETE" });
    onDone();
  }
  return (
    <button
      onClick={del}
      disabled={busy}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      Delete
    </button>
  );
}

/* --------------------------------------------------------------------------- */
function RecordForm({
  resource,
  initial,
  onDone,
  onCancel,
}: {
  resource: Resource;
  initial: Row;
  onDone: () => void;
  onCancel?: () => void;
}) {
  const [values, setValues] = useState<Row>(() => ({ ...initial }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (name: string, v: any) => setValues((p) => ({ ...p, [name]: v }));

  async function save() {
    setSaving(true);
    setError("");

    // Build payload from configured fields only.
    const payload: Row = {};
    for (const f of resource.fields) {
      let v = values[f.name];
      if (f.type === "number") v = v === "" || v == null ? null : Number(v);
      if ((f.type === "list" || f.type === "imagelist") && !Array.isArray(v)) v = [];
      if (f.type === "statlist" && !Array.isArray(v)) v = [];
      if (v === "") v = null;
      payload[f.name] = v;
    }

    try {
      const editingExisting = initial.id != null;
      const res = await fetch(
        editingExisting ? `/api/admin/${resource.table}/${initial.id}` : `/api/admin/${resource.table}`,
        {
          method: editingExisting ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not save.");
        return;
      }
      onDone();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl rounded-3xl bg-white p-7 shadow-[var(--shadow-soft)]">
      <div className="space-y-5">
        {resource.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => set(f.name, v)} />
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-7 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-maroon px-7 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {onCancel && (
          <button onClick={onCancel} className="text-sm font-medium text-ink-soft hover:text-maroon">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------- */
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
}) {
  const base =
    "w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{field.label}</label>

      {field.type === "textarea" && (
        <textarea rows={3} className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "markdown" && (
        <textarea
          rows={12}
          className={`${base} font-mono`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {(field.type === "text" || field.type === "slug") && (
        <input className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "number" && (
        <input type="number" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "date" && (
        <input
          type="date"
          className={base}
          value={value ? String(value).slice(0, 10) : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "select" && (
        <select className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {field.type === "image" && <ImageInput value={value} onChange={onChange} />}
      {field.type === "list" && <ListInput value={value} onChange={onChange} />}
      {field.type === "imagelist" && <ImageListInput value={value} onChange={onChange} />}
      {field.type === "statlist" && <StatListInput value={value} onChange={onChange} />}

      {field.help && <p className="mt-1 text-xs text-ink-soft">{field.help}</p>}
    </div>
  );
}

function ImageInput({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
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
        <button onClick={() => onChange("")} className="text-sm text-red-600 hover:underline">
          Remove
        </button>
      )}
    </div>
  );
}

function ListInput({ value, onChange }: { value?: string[]; onChange: (v: string[]) => void }) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-2 text-sm outline-none focus:border-gold"
            value={it}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-2 text-red-600">
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-sm font-medium text-gold-dark hover:text-maroon"
      >
        + Add
      </button>
    </div>
  );
}

function ImageListInput({ value, onChange }: { value?: string[]; onChange: (v: string[]) => void }) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-3">
      {items.map((url, i) => (
        <div key={i} className="flex items-center gap-3">
          <ImageInput
            value={url}
            onChange={(v) => {
              const next = [...items];
              next[i] = v;
              onChange(next);
            }}
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-sm text-red-600">
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-sm font-medium text-gold-dark hover:text-maroon"
      >
        + Add image
      </button>
    </div>
  );
}

function StatListInput({
  value,
  onChange,
}: {
  value?: { value: string; label: string }[];
  onChange: (v: { value: string; label: string }[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-2">
      {items.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input
            placeholder="250+"
            className="w-28 rounded-xl border border-maroon/20 bg-cream/40 px-3 py-2 text-sm outline-none focus:border-gold"
            value={s.value}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], value: e.target.value };
              onChange(next);
            }}
          />
          <input
            placeholder="Events planned"
            className="flex-1 rounded-xl border border-maroon/20 bg-cream/40 px-3 py-2 text-sm outline-none focus:border-gold"
            value={s.label}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], label: e.target.value };
              onChange(next);
            }}
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-2 text-red-600">
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { value: "", label: "" }])}
        className="text-sm font-medium text-gold-dark hover:text-maroon"
      >
        + Add stat
      </button>
    </div>
  );
}
