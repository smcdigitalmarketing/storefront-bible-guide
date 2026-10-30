import { brand } from "~/content/brand";
import { cn } from "~/lib/utils";

const SIZES = {
  md: "text-2xl",
  lg: "text-4xl sm:text-5xl",
};

/**
 * The provisional wordmark (brand.logoNote): lowercase Syne ExtraBold with the
 * flash burst. Type-led so it can change cheaply.
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
        "font-heading inline-flex items-center gap-[0.18em] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap lowercase",
        SIZES[size],
        className,
      )}
    >
      {brand.name}
    </span>
  );
}
