"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn, type LoginState } from "@/app/admin/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="adm-btn primary" type="submit" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({ next }: { next: string }) {
  const [state, action] = useFormState<LoginState, FormData>(signIn, {});
  return (
    <form action={action} className="adm-form">
      <input type="hidden" name="next" value={next} />
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && <p className="adm-error" role="alert">{state.error}</p>}
      <Submit />
    </form>
  );
}
