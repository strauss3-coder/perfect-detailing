import Image from "next/image";
import type { MediaRef } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Every image slot on the site renders through here — and every video slot,
 * because a `MediaRef` carrying `videoSrc` renders its still as the poster of
 * a silent looping clip.
 *
 * Until real photography is uploaded through the portal's media library, the
 * frame draws an illustrated technical plate instead of a grey box: the motif
 * for that subject, registration brackets, a specular band and the caption
 * set as an instrument label. It reserves its aspect ratio either way, so
 * swapping in a photograph shifts nothing on the page.
 */
export function MediaFrame({
  media,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  plateLabel,
  motifScale = 0.34,
  rounded = "rounded-panel",
}: {
  media: MediaRef;
  className?: string;
  priority?: boolean;
  sizes?: string;
  plateLabel?: string;
  motifScale?: number;
  rounded?: string;
}) {
  const ratio = media.ratio && media.ratio > 0 ? media.ratio : 16 / 9;
  /* The illustrated plate is an instrument diagram and wants its subject
     named on it; a photograph does not want its own alt text printed across
     it, so captions on real imagery have to be asked for. */
  const label = plateLabel ?? media.caption ?? (media.src ? undefined : media.alt);

  return (
    <figure
      className={cn("media-frame group ring-hairline", rounded, className)}
      style={{ aspectRatio: String(ratio) }}
    >
      {media.videoSrc && media.src ? (
        <AmbientVideo
          src={media.videoSrc}
          poster={media.src}
          alt={media.alt}
          sizes={sizes}
          priority={priority}
          className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-gloss)] group-hover:scale-[1.035]"
        />
      ) : media.src ? (
        <Image
          src={asset(media.src)}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-gloss)] group-hover:scale-[1.035]"
        />
      ) : (
        <IllustratedPlate media={media} motifScale={motifScale} />
      )}

      {/* Registration brackets — the plate's optical corners */}
      <Brackets />

      {/* Specular band raking across the frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            "linear-gradient(104deg, transparent 38%, color-mix(in oklab, var(--color-silver) 9%, transparent) 47%, transparent 56%)",
        }}
      />

      {label ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-ink/85 to-transparent p-4 pt-12">
          <span className="label-tech line-clamp-2 max-w-[80%] text-left text-silver/75 normal-case tracking-[0.12em]">
            {label}
          </span>
          <span className="numeral shrink-0 text-[0.6rem] tracking-[0.24em] text-ash">PD</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function Brackets() {
  const common = "absolute h-4 w-4 border-silver/25";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-3 z-10">
      <span className={cn(common, "top-0 left-0 border-t border-l")} />
      <span className={cn(common, "top-0 right-0 border-t border-r")} />
      <span className={cn(common, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(common, "bottom-0 right-0 border-b border-r")} />
    </span>
  );
}

function IllustratedPlate({ media, motifScale }: { media: MediaRef; motifScale: number }) {
  return (
    <span aria-hidden className="absolute inset-0">
      {/* Field grid */}
      <span
        className="absolute inset-0 opacity-[0.35] grid-field"
        style={{ backgroundSize: "48px 48px" }}
      />
      {/* Key light behind the subject */}
      <span
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 44%, color-mix(in oklab, var(--color-electric) 22%, transparent), transparent 72%)",
        }}
      />
      {/* Subject */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-silver/60 transition-transform duration-[1.2s] ease-[var(--ease-gloss)] group-hover:scale-[1.06]"
          style={{ width: `${motifScale * 100}%`, aspectRatio: "1" }}
        >
          <Motif
            motif={media.motif ?? "shield"}
            size={0}
            strokeWidth={1.5}
            className="h-full w-full"
          />
        </span>
      </span>
      {/* Ground shadow so the subject sits in the plate rather than floating */}
      <span
        className="absolute inset-x-[18%] bottom-[14%] h-6 rounded-[50%] blur-md"
        style={{ background: "color-mix(in oklab, var(--color-ceramic) 18%, transparent)" }}
      />
      {/* Vignette */}
      <span
        className="absolute inset-0"
        style={{ background: "radial-gradient(100% 80% at 50% 40%, transparent 45%, rgb(0 0 0 / 0.55))" }}
      />
    </span>
  );
}
