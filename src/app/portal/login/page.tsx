import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, usingDefaultCredentials } from "@/lib/portal/auth";
import { LoginForm } from "@/components/portal/LoginForm";
import { MarkBead } from "@/components/brand/Marks";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/portal/login">) {
  const session = await getSession();
  if (session) redirect("/portal");

  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/portal";

  return (
    <main className="grid min-h-dvh place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <MarkBead size={54} />
          <div>
            <p className="font-display text-[1.4rem] font-bold tracking-tight text-chrome">Perfect Detailing</p>
            <p className="label-tech mt-1.5">Content portal</p>
          </div>
        </div>

        <LoginForm next={next} showDefaultCredentialsNotice={usingDefaultCredentials()} />

        <p className="mt-8 text-center text-[0.75rem] text-ash">
          <Link href="/" className="transition-colors hover:text-ceramic">← Back to the website</Link>
        </p>
      </div>
    </main>
  );
}
