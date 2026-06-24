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
  shoot_type: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SELECT_PLACEHOLDER = "選択してください";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    shoot_type: formData.get("shoot_type"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "入力内容をご確認ください。",
    };
  }

  const data = parsed.data;
  const shootType =
    data.shoot_type && data.shoot_type !== SELECT_PLACEHOLDER
      ? data.shoot_type
      : null;

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
    message: data.message || null,
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
