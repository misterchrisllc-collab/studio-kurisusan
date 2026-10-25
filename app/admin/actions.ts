"use server";

import { redirect } from "next/navigation";
import { adminEmails, createAuthClient, isAdminEmail } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!(formData instanceof FormData)) return { error: "Enter your email and password." };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = createAuthClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: "Email or password is wrong." };
  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    // Only reachable with a correct password, so saying which half is wrong is safe and saves guessing.
    const configured = adminEmails().length;
    console.warn(`admin sign-in refused: ADMIN_EMAILS has ${configured} entr${configured === 1 ? "y" : "ies"}`);
    return {
      error: configured
        ? "This account doesn't have admin access (its email isn't in ADMIN_EMAILS on the server)."
        : "Password OK, but the server has no ADMIN_EMAILS setting. Add it in Vercel for Production and redeploy.",
    };
  }
  redirect(next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin");
}

export async function signOut() {
  await createAuthClient().auth.signOut();
  redirect("/admin/login");
}
