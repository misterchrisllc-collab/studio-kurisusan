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

type Parsed = z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SELECT_PLACEHOLDER = "選択してください";
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

  // Try both delivery paths; succeed if at least one works.
  const stored = await storeInSupabase(data).catch((err) => {
    console.error("contact db insert failed (non-fatal)", err);
    return false;
  });
  const emailed = await sendNotification(data).catch((err) => {
    console.error("contact email failed (non-fatal)", err);
    return false;
  });

  if (!stored && !emailed) {
    return {
      status: "error",
      message:
        "送信先が未設定です。お手数ですが studiokurisusan@gmail.com までご連絡ください。",
    };
  }

  return {
    status: "success",
    message: "送信しました。折り返しご連絡いたします。",
  };
}

// Build the "詳細" rows (only fields the user actually filled in).
function detailPairs(d: Parsed): [string, string][] {
  return (
    [
      ["会社・店舗名", d.company],
      ["電話番号", clean(d.phone)],
      ["希望の連絡方法", clean(d.contact_method)],
      ["撮影・制作内容", clean(d.shoot_type)],
      ["ご予算の目安", clean(d.budget)],
      ["希望時期", clean(d.timeline)],
    ] as [string, string][]
  ).filter(([, v]) => v.trim() !== "");
}

async function storeInSupabase(d: Parsed): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const extras = detailPairs(d)
    .filter(([label]) => label !== "撮影・制作内容")
    .map(([label, v]) => `${label}: ${v}`);

  const fullMessage =
    [d.message.trim(), extras.length ? extras.join("\n") : ""]
      .filter(Boolean)
      .join("\n\n---\n") || null;

  const { error } = await supabase.from("contacts").insert({
    name: d.name,
    company: d.company || null,
    email: d.email,
    shoot_type: clean(d.shoot_type) || null,
    message: fullMessage,
  });
  if (error) throw error;
  return true;
}

async function sendNotification(d: Parsed): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false; // graceful degradation until a key is configured

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const to = process.env.CONTACT_RECIPIENT_EMAIL || "studiokurisusan@gmail.com";
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const detailRows = detailPairs(d)
    .map(
      ([label, v]) =>
        `<tr><td style="padding:5px 18px 5px 0;color:#8a8178;font-size:13px;white-space:nowrap">${label}</td><td style="padding:5px 0;font-size:13px;color:#111">${esc(
          v,
        )}</td></tr>`,
    )
    .join("");

  const messageBlock = d.message.trim()
    ? `<div style="white-space:pre-wrap;line-height:1.7;font-size:14px;color:#111;border-top:1px solid #eee;padding-top:16px;margin-top:16px">${esc(
        d.message,
      )}</div>`
    : "";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: d.email,
    subject: `STUDIO くりすさん — 新規お問い合わせ: ${d.name}${
      d.company ? `（${d.company}）` : ""
    }`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#fff;color:#111;padding:32px;max-width:560px">
        <p style="font-family:ui-monospace,monospace;letter-spacing:.2em;font-size:11px;color:#E8198B;text-transform:uppercase;margin:0 0 24px">STUDIO くりすさん · 新規お問い合わせ</p>
        <p style="margin:0 0 6px;font-size:16px"><strong>${esc(d.name)}</strong></p>
        <p style="margin:0 0 20px;font-size:13px;color:#666">&lt;${esc(
          d.email,
        )}&gt;</p>
        ${detailRows ? `<table style="border-collapse:collapse;margin:0 0 4px">${detailRows}</table>` : ""}
        ${messageBlock}
        <p style="margin:28px 0 0;font-size:11px;color:#aaa">この通知は studio-kurisusan.vercel.app のお問い合わせフォームから送信されました。返信するとお客様に直接届きます。</p>
      </div>`,
  });

  if (error) throw error;
  return true;
}
