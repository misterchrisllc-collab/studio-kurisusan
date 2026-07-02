"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

const PLACEHOLDER = "選択してください";

const SHOOT_TYPES = [
  PLACEHOLDER,
  "Googleマップ更新パッケージ",
  "料理・メニュー撮影",
  "店内・空間撮影",
  "商品撮影",
  "企業・採用撮影",
  "建設・リノベーション記録",
  "ファッション・人物撮影",
  "リール・ショート動画",
  "フルブランドパッケージ",
  "その他・未定",
];

const CONTACT_METHODS = [PLACEHOLDER, "メール", "電話", "LINE", "Instagram DM"];

const BUDGETS = [
  PLACEHOLDER,
  "〜5万円",
  "5〜10万円",
  "10〜20万円",
  "20万円以上",
  "相談して決めたい",
];

const TIMELINES = [
  PLACEHOLDER,
  "できるだけ早く",
  "1ヶ月以内",
  "1〜3ヶ月",
  "時期は未定",
];

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="fs-btn" disabled={pending}>
      {pending ? "送信中..." : "送信する →"}
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
      <p className="fs-note">
        <span className="req">*</span> は必須項目です。
      </p>

      <div className="fr">
        <div className="fg">
          <label className="fl" htmlFor="name">
            お名前 <span className="req">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="fi"
            placeholder="田中 太郎"
            required
            aria-required="true"
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

      <div className="fr">
        <div className="fg">
          <label className="fl" htmlFor="email">
            メールアドレス <span className="req">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="fi"
            placeholder="hello@example.com"
            required
            aria-required="true"
          />
        </div>
        <div className="fg">
          <label className="fl" htmlFor="phone">
            電話番号
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="fi"
            placeholder="090-0000-0000"
          />
        </div>
      </div>

      <div className="fg">
        <label className="fl" htmlFor="contact_method">
          希望の連絡方法
        </label>
        <select
          id="contact_method"
          name="contact_method"
          className="fs"
          defaultValue={PLACEHOLDER}
        >
          {CONTACT_METHODS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="fg">
        <label className="fl" htmlFor="shoot_type">
          撮影・制作内容
        </label>
        <select
          id="shoot_type"
          name="shoot_type"
          className="fs"
          defaultValue={PLACEHOLDER}
        >
          {SHOOT_TYPES.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="fr">
        <div className="fg">
          <label className="fl" htmlFor="budget">
            ご予算の目安
          </label>
          <select
            id="budget"
            name="budget"
            className="fs"
            defaultValue={PLACEHOLDER}
          >
            {BUDGETS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="fg">
          <label className="fl" htmlFor="timeline">
            希望時期
          </label>
          <select
            id="timeline"
            name="timeline"
            className="fs"
            defaultValue={PLACEHOLDER}
          >
            {TIMELINES.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="fg">
        <label className="fl" htmlFor="message">
          プロジェクトについて
        </label>
        <textarea
          id="message"
          name="message"
          className="fta"
          placeholder="撮影したい内容、使用目的（Googleマップ・EC・採用サイトなど）、ご予算、希望時期などをご記入ください。決まっていない点はそのままで構いません。"
        />
      </div>

      <SubmitButton />

      {state.status !== "idle" && state.message && (
        <p
          className={`fmsg ${state.status === "success" ? "ok" : "err"}`}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
