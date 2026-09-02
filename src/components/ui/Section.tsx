import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tick-mark rule used to separate major sections. */
export function MicronRule({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden>
      <span className="micron-rule flex-1" />
      {label ? <span className="label-tech shrink-0">{label}</span> : null}
      <span className="micron-rule flex-1" />
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label-tech inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="inline-block h-px w-7 bg-linear-to-r from-transparent to-ceramic" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  action,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
  /** Use h1 when this heading is the page's title. */
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading className="text-display text-chrome text-balance">{title}</Heading>
        {lede ? <p className="text-lede text-pretty">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Full-bleed section wrapper with the shared vertical rhythm. */
export function Section({
  children,
  className,
  id,
  bleed,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative section-y", className)}>
      {bleed}
      <div className="shell relative z-10">{children}</div>
    </section>
  );
}
