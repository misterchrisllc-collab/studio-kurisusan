import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

/**
 * Admin auth for /admin. Supabase Auth (email + password) on the same project
 * as the contact form, plus an allowlist: a valid Supabase login is not
 * enough, the email must also be in ADMIN_EMAILS.
 */
export function adminEmails(): string[] {
  return parseAdminEmails(process.env.ADMIN_EMAILS);
}

/** Tolerates what a dashboard paste can add: quotes, spaces, newlines, ";" separators. */
export function parseAdminEmails(raw: string | undefined): string[] {
  return (raw ?? "")
    .replace(/^\s*ADMIN_EMAILS\s*=/i, "")
    .split(/[,;\s]+/)
    .map((e) => e.replace(/^["']+|["']+$/g, "").trim().toLowerCase())
    .filter((e) => e.includes("@"));
}

export function isAdminEmail(email: string | undefined | null): boolean {
  return !!email && adminEmails().includes(email.toLowerCase());
}

export function createAuthClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component: middleware refreshes the session instead.
          }
        },
      },
    },
  );
}

export async function getAdminUser(): Promise<User | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const supabase = createAuthClient();
  const { data } = await supabase.auth.getUser();
  return data.user && isAdminEmail(data.user.email) ? data.user : null;
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Not signed in");
  }
}

/** Call at the top of every admin server action and route handler. */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser();
  if (!user) throw new UnauthorizedError();
  return user;
}
