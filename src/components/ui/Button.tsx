"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Interactive";
import { cn } from "@/lib/utils";

type Intent = "primary" | "secondary" | "ghost";

const INTENT: Record<Intent, string> = {
  primary:
    "bg-linear-115 from-ceramic to-electric text-ink shadow-[0_14px_40px_-14px_color-mix(in_oklab,var(--color-electric)_75%,transparent)] hover:shadow-[0_18px_52px_-14px_color-mix(in_oklab,var(--color-ceramic)_60%,transparent)]",
  secondary:
    "panel-glass text-chrome hover:border-ceramic/45 hover:text-white",
  ghost:
    "text-silver hover:text-ceramic border border-transparent hover:border-ceramic/30",
};

interface BaseProps {
  children: ReactNode;
  intent?: Intent;
  className?: string;
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

const SIZES = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-6 text-[0.86rem]",
  lg: "h-13 px-8 text-[0.92rem]",
} as const;

function shell(intent: Intent, size: keyof typeof SIZES, className?: string) {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[0.01em] whitespace-nowrap",
    "transition-[color,border-color,box-shadow,background-color,transform] duration-400 ease-[var(--ease-gloss)]",
    "active:scale-[0.975]",
    SIZES[size],
    INTENT[intent],
    className,
  );
}

/** The raking highlight that crosses the button on hover. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-linear-to-r from-transparent via-white/28 to-transparent transition-[left] duration-700 ease-[var(--ease-gloss)] group-hover/btn:left-full"
    />
  );
}

export function ButtonLink({
  href,
  children,
  intent = "primary",
  size = "md",
  className,
  magnetic = true,
  external,
  onNavigate,
}: BaseProps & { href: string; external?: boolean; onNavigate?: () => void }) {
  const inner = (
    <Link
      href={href}
      onClick={onNavigate}
      className={shell(intent, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Sheen />
      <span className="relative flex items-center gap-2">{children}</span>
    </Link>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}

export function Button({
  children,
  intent = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: BaseProps & {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(shell(intent, size, className), disabled && "cursor-not-allowed opacity-55")}
    >
      <Sheen />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

/** Right-pointing chevron used inside buttons and inline links. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("transition-transform duration-400 ease-[var(--ease-gloss)] group-hover/btn:translate-x-1", className)}
    >
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
