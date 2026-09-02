"use client";

import { useMemo, useState, useTransition, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CollectionKey, SingletonKey } from "@/content/types";
import {
  saveCollectionAction,
  saveCollectionItemAction,
  saveFilteredCollectionAction,
  saveSingletonAction,
} from "@/app/actions/cms";
import { ObjectFields, Field } from "./FieldRenderer";
import { cn } from "@/lib/utils";

type Target =
  | { type: "singleton"; key: SingletonKey }
  | { type: "collection"; key: CollectionKey }
  | { type: "collectionSubset"; key: CollectionKey; filterKey: string; filterValue: string }
  | { type: "collectionItem"; key: CollectionKey; itemId: string };

/**
 * Wraps the field renderer with save state.
 *
 * Dirty state is tracked against a JSON snapshot of what was loaded, so the
 * save button is honest about whether there is anything to save, and a
 * beforeunload guard stops an editor walking away from unsaved work.
 */
export function DocumentEditor({
  target,
  initial,
  title,
  description,
}: {
  target: Target;
  initial: unknown;
  title: string;
  description?: string;
}) {
  const baseline = useMemo(() => JSON.stringify(initial), [initial]);
  const [value, setValue] = useState<unknown>(initial);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: string; message: string } | null>(null);

  const dirty = JSON.stringify(value) !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const guard = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);

  function save() {
    startTransition(async () => {
      const payload = JSON.stringify(value);
      const outcome =
        target.type === "singleton"
          ? await saveSingletonAction(target.key, payload)
          : target.type === "collectionSubset"
            ? await saveFilteredCollectionAction(target.key, target.filterKey, target.filterValue, payload)
            : target.type === "collectionItem"
              ? await saveCollectionItemAction(target.key, target.itemId, payload)
              : await saveCollectionAction(target.key, payload);
      setResult(outcome);
      if (outcome.status === "saved") {
        // Re-baseline so the button settles back to "no changes".
        window.setTimeout(() => setResult(null), 4000);
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-20 -mx-6 flex flex-wrap items-center justify-between gap-4 border-b border-silver/10 bg-ink/85 px-6 py-4 backdrop-blur-xl">
        <div className="min-w-0">
          <h1 className="font-display text-[1.35rem] tracking-tight text-chrome">{title}</h1>
          {description ? <p className="mt-1 text-[0.8rem] text-ash">{description}</p> : null}
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {result ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={cn(
                  "text-[0.79rem]",
                  result.status === "saved" ? "text-ceramic" : "text-amber",
                )}
                role="status"
              >
                {result.message}
              </motion.p>
            ) : dirty ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[0.79rem] text-amber"
              >
                Unsaved changes
              </motion.p>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={save}
            disabled={pending || !dirty}
            className={cn(
              "rounded-full px-5 py-2.5 text-[0.83rem] font-medium transition-all duration-300",
              dirty
                ? "bg-linear-115 from-ceramic to-electric text-ink hover:shadow-[0_12px_36px_-12px_color-mix(in_oklab,var(--color-ceramic)_70%,transparent)]"
                : "border border-silver/15 text-ash",
              pending && "opacity-60",
            )}
          >
            {pending ? "Saving…" : dirty ? "Save & publish" : "Saved"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 pb-24">
        {target.type === "collection" || target.type === "collectionSubset" ? (
          <Field
            path={target.key}
            fieldKey={target.key}
            labelOverride={title}
            value={value}
            onChange={setValue}
          />
        ) : (
          <ObjectFields
            path={target.key}
            value={value as Record<string, unknown>}
            onChange={(next) => setValue(next)}
          />
        )}
      </div>
    </div>
  );
}
