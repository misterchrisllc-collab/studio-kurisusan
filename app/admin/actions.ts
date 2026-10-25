"use server";

import { redirect } from "next/navigation";
import { createAuthClient, isAdminEmail } from "@/lib/admin-auth";

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
    return { error: "This account doesn't have admin access." };
  }
  redirect(next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin");
}

export async function signOut() {
  await createAuthClient().auth.signOut();
  redirect("/admin/login");
}
