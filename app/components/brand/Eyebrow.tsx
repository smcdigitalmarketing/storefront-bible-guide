import type { ComponentProps } from "react";
import { Slot } from "radix-ui";

import { cn } from "~/lib/utils";

/**
 * Lamplight's calm label: small gold caps in the heading face, set over
 * headings, sections and slides. A `<p>` by default; `asChild` puts the style
 * on your own element (`<Eyebrow asChild><h2>…</h2></Eyebrow>`).
 */
export function Eyebrow({
  asChild = false,
  className,
  ...props
}: ComponentProps<"p"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "p";
  return (
    <Comp
      data-slot="eyebrow"
      className={cn(
        "font-heading text-xs font-medium tracking-[0.12em] text-highlight uppercase",
        className,
      )}
      {...props}
    />
  );
}
