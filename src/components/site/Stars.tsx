import { cn } from "@/lib/utils";

/** Five-point rating. Renders a real accessible value, not five icons. */
export function Stars({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i + 1));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <defs>
              <linearGradient id={`star-${i}-${Math.round(fill * 100)}`} x1="0" y1="0" x2="24" y2="0">
                <stop offset={fill} stopColor="var(--color-ceramic)" />
                <stop offset={fill} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 3.2l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.6l6.1-.8L12 3.2Z"
              fill={`url(#star-${i}-${Math.round(fill * 100)})`}
              stroke="color-mix(in oklab, var(--color-ceramic) 55%, transparent)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
}
