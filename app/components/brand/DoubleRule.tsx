import { cn } from "~/lib/utils";

/**
 * Lamplight's double rule: a 5px strip with a 1px ink rule at the top and
 * the bottom. Decorative, so it's hidden from screen readers. It takes the
 * width of its container.
 */
export function DoubleRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-slot="double-rule"
      className={cn("h-1.25 border-y border-foreground", className)}
    />
  );
}
