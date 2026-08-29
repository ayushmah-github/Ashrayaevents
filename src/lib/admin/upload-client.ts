"use client";

/* ============================================================================
 * Shared admin upload helper — client-side compresses images (resize + JPEG
 * re-encode) before sending to /api/admin/upload, so large phone/DSLR photos
 * don't bloat storage or slow the site down.
 * ========================================================================== */

const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.82;

/** Resize/re-encode an image client-side. Non-image or already-small files
 *  pass through untouched (SVG/GIF are skipped — resizing would break them). */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    if (scale >= 1 && file.size < 1.5 * 1024 * 1024) return file; // already small enough

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file; // compression didn't help

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file; // fall back to the original on any decode error
  }
}

export async function uploadFile(file: File): Promise<string> {
  const optimized = await compressImage(file);
  const fd = new FormData();
  fd.append("file", optimized);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}
