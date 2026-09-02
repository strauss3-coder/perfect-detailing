import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[1.6rem] tracking-tight text-chrome">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-[0.85rem] leading-relaxed text-ash">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function Panel({
  children,
  className,
  title,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("panel-solid rounded-panel", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-silver/10 px-5 py-4">
          <h2 className="font-display text-[1.02rem] tracking-tight text-chrome">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatTile({
  label,
  value,
  detail,
  tone = "default",
  href,
}: {
  label: string;
  value: string | number;
  detail?: string;
  tone?: "default" | "accent" | "warn";
  href?: string;
}) {
  const body = (
    <div
      className={cn(
        "panel-solid flex h-full flex-col gap-1.5 rounded-panel p-5 transition-colors duration-300",
        href && "hover:border-ceramic/35",
      )}
    >
      <p className="label-tech text-silver/60">{label}</p>
      <p
        className={cn(
          "numeral text-[1.9rem] leading-none font-medium",
          tone === "accent" ? "text-ceramic" : tone === "warn" ? "text-amber" : "text-chrome",
        )}
      >
        {value}
      </p>
      {detail ? <p className="text-[0.75rem] leading-relaxed text-ash">{detail}</p> : null}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

const STATUS_TONE: Record<string, string> = {
  new: "border-ceramic/40 text-ceramic",
  contacted: "border-electric/40 text-electric-soft",
  quoted: "border-amber/40 text-amber",
  scheduled: "border-silver/30 text-silver",
  won: "border-ceramic/50 bg-ceramic/10 text-ceramic",
  lost: "border-silver/15 text-ash",
  published: "border-ceramic/40 text-ceramic",
  draft: "border-amber/40 text-amber",
  archived: "border-silver/15 text-ash",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "label-tech inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[0.55rem]",
        STATUS_TONE[status] ?? "border-silver/20 text-silver/60",
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
      <p className="font-display text-[1.05rem] text-chrome">{title}</p>
      <p className="max-w-sm text-[0.83rem] leading-relaxed text-ash">{body}</p>
    </div>
  );
}
