"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

const SHOOT_TYPES = [
  "選択してください",
  "Googleマップ更新パッケージ",
  "料理・メニュー撮影",
  "店内・空間撮影",
  "商品撮影",
  "企業・採用撮影",
  "建設・リノベーション記録",
  "リール・ショート動画",
  "フルブランドパッケージ",
  "その他・未定",
];

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="fs-btn" disabled={pending}>
      {pending ? "送信中..." : "送信する"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <h2>プロジェクトのご相談</h2>
      <div className="fr">
        <div className="fg">
          <label className="fl" htmlFor="name">
            お名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="fi"
            placeholder="田中 太郎"
            required
          />
        </div>
        <div className="fg">
          <label className="fl" htmlFor="company">
            会社・店舗名
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="fi"
            placeholder="○○株式会社"
          />
        </div>
      </div>
      <div className="fg">
        <label className="fl" htmlFor="email">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="fi"
          placeholder="hello@example.com"
          required
        />
      </div>
      <div className="fg">
        <label className="fl" htmlFor="shoot_type">
          撮影・制作内容
        </label>
        <select id="shoot_type" name="shoot_type" className="fs" defaultValue={SHOOT_TYPES[0]}>
          {SHOOT_TYPES.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="fg">
        <label className="fl" htmlFor="message">
          プロジェクトについて
        </label>
        <textarea
          id="message"
          name="message"
          className="fta"
          placeholder="撮影したい内容、使用目的、ご予算、希望時期などをご記入ください。"
        />
      </div>
      <SubmitButton />
      {state.status !== "idle" && state.message && (
        <p className={`fmsg ${state.status === "success" ? "ok" : "err"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
