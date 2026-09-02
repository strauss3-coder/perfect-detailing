"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/cms";

export function LoginForm({
  next,
  showDefaultCredentialsNotice,
}: {
  next: string;
  showDefaultCredentialsNotice: boolean;
}) {
  const [state, action, pending] = useActionState(loginAction, { status: "idle" as const, message: "" });

  return (
    <form action={action} className="panel-glass flex flex-col gap-5 rounded-panel p-7">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="label-tech text-silver/60">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="h-11 rounded-tile border border-silver/15 bg-ink/50 px-3.5 text-[0.88rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="label-tech text-silver/60">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-tile border border-silver/15 bg-ink/50 px-3.5 text-[0.88rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
        />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="rounded-tile border border-amber/40 bg-amber/8 px-3.5 py-2.5 text-[0.8rem] text-amber">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 rounded-full bg-linear-115 from-ceramic to-electric text-[0.86rem] font-medium text-ink transition-opacity disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>

      {showDefaultCredentialsNotice ? (
        <p className="rounded-tile border border-amber/30 bg-amber/6 px-3.5 py-3 text-[0.74rem] leading-relaxed text-amber/90">
          No portal password is configured, so the development default is active. Set
          <code className="numeral mx-1">PORTAL_EMAIL</code> and
          <code className="numeral mx-1">PORTAL_PASSWORD_HASH</code> in your environment before this site
          is published.
        </p>
      ) : null}
    </form>
  );
}
