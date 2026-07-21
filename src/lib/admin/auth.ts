/* ============================================================================
 * Admin auth — a simple username/password gate for /admin.
 * Credentials live in env vars (ADMIN_USERNAME / ADMIN_PASSWORD) and the session
 * is a stateless SHA-256 token stored in an HTTP-only cookie. Works in both the
 * Edge middleware and Node route handlers (uses Web Crypto).
 * ========================================================================== */

export const ADMIN_COOKIE = "ae_admin";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The cookie value a logged-in admin should carry. Null if auth isn't set up. */
export async function expectedToken(): Promise<string | null> {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!u || !p || !s) return null;
  return sha256Hex(`${u}:${p}:${s}`);
}

export async function isValidToken(token?: string): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedToken();
  return !!expected && token === expected;
}

export function checkCredentials(username: string, password: string): boolean {
  return (
    !!process.env.ADMIN_SESSION_SECRET &&
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

/** True when the admin login has been configured in the environment. */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET,
  );
}
