import { cn } from "~/lib/utils";

import { DoubleRule } from "./DoubleRule";

/** Lamplight's section divider: the double rule, inset to the page width. */
export function Divider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("mx-auto max-w-6xl px-6", className)}>
      <DoubleRule className="opacity-80" />
    </div>
  );
}
