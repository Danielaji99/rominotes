import { cookies } from "next/headers";

const SESSION_NAME = "notes_session";

/**
 * Create a session cookie for the given user id.
 * This function is async because `cookies()` returns a Promise-like cookie store
 * in some Next.js versions / typings.
 */
export async function createSession(userId: number): Promise<void> {
  const cookieStore = await cookies();

  // `set` accepts an object describing the cookie.
  // Use `secure` only in production to allow local dev over http.
  cookieStore.set({
    name: SESSION_NAME,
    value: String(userId),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Set a reasonable maxAge (in seconds). Adjust as needed.
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Read the session cookie and return the stored user id or null.
 */
export async function getSessionUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_NAME);
  if (!session) return null;

  const id = Number(session.value);
  return Number.isNaN(id) ? null : id;
}

/**
 * Destroy the session cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();

  // `delete` can accept either a cookie name or an options object.
  // Use a single options object with the cookie `name` and `path` to match how it was set.
  cookieStore.delete({ name: SESSION_NAME, path: "/" });
}
