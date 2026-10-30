import { brand } from "~/content/brand";
import { cn } from "~/lib/utils";

const SIZES = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl sm:text-5xl",
  xl: "text-5xl sm:text-7xl",
};

/**
 * The provisional wordmark (brand.logoNote): a small gold oil lamp beside
 * "Lamplight" in oxblood Cormorant Garamond (Psalm 119:105). Type-led so it
 * can change cheaply.
 */
export function Wordmark({
  size = "md",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={brand.name}
      className={cn(
        "inline-flex items-center gap-[0.28em] font-heading leading-none font-semibold tracking-[0.01em] whitespace-nowrap",
        SIZES[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 64 48"
        aria-hidden
        fill="currentColor"
        className="h-[0.8em] w-auto text-highlight"
      >
        <path d="M32 2c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11Z" />
        <path d="M6 28c8-6 19-8 30-8 9 0 16 2 22 6l-6 4c-3 6-11 10-20 10-7 0-13-2-17-6l-9-6Z" />
        <rect x="20" y="42" width="24" height="4" rx="2" />
      </svg>
      <span className="text-primary">{brand.name}</span>
    </span>
  );
}
