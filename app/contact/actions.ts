"use server";

import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください。"),
  company: z.string().trim().optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください。")
    .email("正しいメールアドレスを入力してください。"),
  phone: z.string().trim().optional().default(""),
  contact_method: z.string().trim().optional().default(""),
  shoot_type: z.string().trim().optional().default(""),
  budget: z.string().trim().optional().default(""),
  timeline: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SELECT_PLACEHOLDER = "選択してください";

// Treat the select placeholder as "not chosen".
const clean = (v: string) => (v && v !== SELECT_PLACEHOLDER ? v : "");

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contact_method: formData.get("contact_method"),
    shoot_type: formData.get("shoot_type"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "入力内容をご確認ください。",
    };
  }

  const data = parsed.data;
  const shootType = clean(data.shoot_type) || null;

  // The contacts table stores name/company/email/shoot_type/message. Fold the
  // extra structured fields into the message so nothing is lost server-side.
  const extras: string[] = [];
  if (clean(data.phone)) extras.push(`電話番号: ${data.phone}`);
  if (clean(data.contact_method))
    extras.push(`希望の連絡方法: ${data.contact_method}`);
  if (clean(data.budget)) extras.push(`ご予算の目安: ${data.budget}`);
  if (clean(data.timeline)) extras.push(`希望時期: ${data.timeline}`);

  const fullMessage =
    [data.message.trim(), extras.length ? extras.join("\n") : ""]
      .filter(Boolean)
      .join("\n\n---\n") || null;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      status: "error",
      message:
        "送信先が未設定です。お手数ですが studiokurisusan@gmail.com までご連絡ください。",
    };
  }

  const { error } = await supabase.from("contacts").insert({
    name: data.name,
    company: data.company || null,
    email: data.email,
    shoot_type: shootType,
    message: fullMessage,
  });

  if (error) {
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  return {
    status: "success",
    message: "送信しました。折り返しご連絡いたします。",
  };
}
