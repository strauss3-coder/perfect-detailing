"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  blankLike,
  humanise,
  inferKind,
  isHidden,
  itemLabel,
  selectOptions,
} from "@/lib/portal/fields";
import { cn } from "@/lib/utils";

type Value = unknown;

interface FieldProps {
  path: string;
  fieldKey: string;
  value: Value;
  onChange: (next: Value) => void;
  depth?: number;
  labelOverride?: string;
}

/**
 * Recursive editor for one field of a content document.
 *
 * Everything the portal edits flows through here: primitives get the right
 * control, objects become fieldsets, arrays of objects become reorderable
 * cards. Depth is tracked so nesting stays legible rather than turning into
 * an indent staircase.
 */
export function Field({ path, fieldKey, value, onChange, depth = 0, labelOverride }: FieldProps) {
  const id = useId();
  const kind = inferKind(fieldKey, value);
  const label = labelOverride ?? humanise(fieldKey);

  if (isHidden(fieldKey)) return null;

  switch (kind) {
    case "boolean":
      return (
        <div className="flex items-center justify-between gap-6 rounded-tile border border-silver/10 bg-ink/40 px-4 py-3.5">
          <label htmlFor={id} className="text-[0.86rem] text-chrome">{label}</label>
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => onChange(!value)}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300",
              value ? "border-ceramic/50 bg-ceramic/25" : "border-silver/20 bg-silver/8",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-4.5 w-4.5 rounded-full transition-[left,background-color] duration-300 ease-[var(--ease-gloss)]",
                value ? "left-[1.45rem] bg-ceramic" : "left-0.5 bg-silver/60",
              )}
            />
          </button>
        </div>
      );

    case "number":
      return (
        <Labelled id={id} label={label}>
          <input
            id={id}
            type="number"
            step="any"
            value={Number.isFinite(value as number) ? (value as number) : ""}
            onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
            className={inputClass}
          />
        </Labelled>
      );

    case "select":
      return (
        <Labelled id={id} label={label}>
          <select
            id={id}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            {selectOptions(fieldKey).map((option) => (
              <option key={option} value={option}>{option || "—"}</option>
            ))}
          </select>
        </Labelled>
      );

    case "colour":
      return (
        <Labelled id={id} label={label}>
          <div className="flex gap-2">
            <input
              type="color"
              value={String(value ?? "#000000").slice(0, 7)}
              onChange={(e) => onChange(e.target.value)}
              aria-label={`${label} colour picker`}
              className="h-11 w-14 cursor-pointer rounded-tile border border-silver/15 bg-ink/40 p-1"
            />
            <input
              id={id}
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              className={cn(inputClass, "numeral flex-1")}
            />
          </div>
        </Labelled>
      );

    case "date":
      return (
        <Labelled id={id} label={label}>
          <input
            id={id}
            type="date"
            value={String(value ?? "").slice(0, 10)}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, "numeral")}
          />
        </Labelled>
      );

    case "url":
      return (
        <Labelled id={id} label={label} hint="Internal paths start with a slash. External links need https://">
          <input
            id={id}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, "numeral text-[0.82rem]")}
          />
        </Labelled>
      );

    case "richtext":
      return (
        <Labelled id={id} label={label} hint="Blank line between paragraphs">
          <textarea
            id={id}
            rows={14}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, "h-auto resize-y py-3 leading-relaxed")}
          />
        </Labelled>
      );

    case "longtext":
      return (
        <Labelled id={id} label={label}>
          <textarea
            id={id}
            rows={3}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, "h-auto resize-y py-3 leading-relaxed")}
          />
        </Labelled>
      );

    case "stringList":
      return (
        <StringList
          label={label}
          items={(value as unknown[]).map((v) => String(v ?? ""))}
          onChange={(items) => onChange(items)}
        />
      );

    case "objectList":
      return (
        <ObjectList
          path={path}
          label={label}
          items={value as Record<string, unknown>[]}
          onChange={(items) => onChange(items)}
          depth={depth}
        />
      );

    case "object":
      return (
        <Fieldset label={label} depth={depth}>
          <ObjectFields
            path={path}
            value={value as Record<string, unknown>}
            onChange={onChange}
            depth={depth + 1}
          />
        </Fieldset>
      );

    default:
      return (
        <Labelled id={id} label={label}>
          <input
            id={id}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        </Labelled>
      );
  }
}

const inputClass =
  "h-11 w-full rounded-tile border border-silver/15 bg-ink/40 px-3.5 text-[0.87rem] text-chrome outline-none transition-colors focus:border-ceramic/50";

function Labelled({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-tech text-silver/60">{label}</label>
      {children}
      {hint ? <p className="text-[0.72rem] text-ash">{hint}</p> : null}
    </div>
  );
}

function Fieldset({
  label,
  depth,
  children,
}: {
  label: string;
  depth: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(depth < 1);
  return (
    <fieldset className="rounded-tile border border-silver/12 bg-graphite/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-3"
      >
        <legend className="label-tech text-ceramic/80">{label}</legend>
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 border-t border-silver/10 p-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </fieldset>
  );
}

export function ObjectFields({
  path,
  value,
  onChange,
  depth = 0,
}: {
  path: string;
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  depth?: number;
}) {
  return (
    <>
      {Object.entries(value).map(([key, child]) => (
        <Field
          key={key}
          path={`${path}.${key}`}
          fieldKey={key}
          value={child}
          depth={depth}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </>
  );
}

function StringList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-tile border border-silver/12 bg-graphite/40 p-4">
      <div className="flex items-center justify-between">
        <span className="label-tech text-ceramic/80">{label}</span>
        <span className="numeral text-[0.68rem] text-ash">{items.length}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <input
              value={item}
              aria-label={`${label} ${index + 1}`}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                onChange(next);
              }}
              className={cn(inputClass, "flex-1")}
            />
            <IconButton
              label={`Remove ${label} ${index + 1}`}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              tone="danger"
            >
              ×
            </IconButton>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-1 w-fit rounded-full border border-silver/15 px-3.5 py-1.5 text-[0.76rem] text-silver/70 transition-colors hover:border-ceramic/45 hover:text-ceramic"
      >
        + Add
      </button>
    </div>
  );
}

function ObjectList({
  path,
  label,
  items,
  onChange,
  depth,
}: {
  path: string;
  label: string;
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
  depth: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row);
    onChange(next);
    setOpenIndex(to);
  };

  return (
    <div className="flex flex-col gap-3 rounded-tile border border-silver/12 bg-graphite/40 p-4">
      <div className="flex items-center justify-between">
        <span className="label-tech text-ceramic/80">{label}</span>
        <span className="numeral text-[0.68rem] text-ash">{items.length}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item, index) => {
          const open = openIndex === index;
          return (
            <li key={index} className="overflow-hidden rounded-tile border border-silver/12 bg-ink/40">
              <div className="flex items-center gap-1 px-2.5 py-2">
                <span className="numeral w-6 shrink-0 text-center text-[0.66rem] text-ash">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex flex-1 items-center gap-2 truncate py-1.5 text-left text-[0.85rem] text-chrome"
                >
                  <span className="truncate">{itemLabel(item, index)}</span>
                </button>
                <IconButton label={`Move ${itemLabel(item, index)} up`} onClick={() => move(index, index - 1)}>↑</IconButton>
                <IconButton label={`Move ${itemLabel(item, index)} down`} onClick={() => move(index, index + 1)}>↓</IconButton>
                <IconButton
                  label={`Duplicate ${itemLabel(item, index)}`}
                  onClick={() => {
                    const copy = structuredClone(item) as Record<string, unknown>;
                    if (typeof copy.id === "string") copy.id = `${copy.id}-copy-${Math.random().toString(36).slice(2, 6)}`;
                    const next = [...items];
                    next.splice(index + 1, 0, copy);
                    onChange(next);
                  }}
                >
                  ⧉
                </IconButton>
                <IconButton
                  label={`Delete ${itemLabel(item, index)}`}
                  onClick={() => {
                    onChange(items.filter((_, i) => i !== index));
                    setOpenIndex(null);
                  }}
                  tone="danger"
                >
                  ×
                </IconButton>
                <span className="ml-1"><Chevron open={open} /></span>
              </div>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4 border-t border-silver/10 p-4">
                      <ObjectFields
                        path={`${path}[${index}]`}
                        value={item}
                        depth={depth + 1}
                        onChange={(next) => {
                          const copy = [...items];
                          copy[index] = next;
                          onChange(copy);
                        }}
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          const template = items[items.length - 1] ?? {};
          const next = [...items, blankLike(template) as Record<string, unknown>];
          onChange(next);
          setOpenIndex(next.length - 1);
        }}
        disabled={items.length === 0}
        className="w-fit rounded-full border border-silver/15 px-3.5 py-1.5 text-[0.76rem] text-silver/70 transition-colors hover:border-ceramic/45 hover:text-ceramic disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Add {label.toLowerCase()}
      </button>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  tone?: "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-7 w-7 shrink-0 place-items-center rounded-md border border-transparent text-[0.85rem] transition-colors",
        tone === "danger"
          ? "text-ash hover:border-amber/40 hover:text-amber"
          : "text-ash hover:border-silver/25 hover:text-chrome",
      )}
    >
      {children}
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
      className={cn("shrink-0 text-ash transition-transform duration-300", open && "rotate-180")}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
