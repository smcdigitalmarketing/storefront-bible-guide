import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Tone = "primary" | "secondary";
type Size = "md" | "lg";

/**
 * Lamplight's button: small caps in the heading face on a square-cornered
 * oxblood fill, or a 1px ink outline that fills with ink on hover. Layered on
 * the shadcn Button's default and outline variants.
 */
export function brandButtonClass(tone: Tone = "primary", size: Size = "md") {
  return cn(
    "font-heading gap-2 rounded-sm font-semibold tracking-[0.12em] whitespace-normal uppercase",
    size === "lg" ? "h-12 px-7 text-sm" : "h-11 px-5 text-xs",
    tone === "primary"
      ? "hover:bg-foreground hover:text-background"
      : "border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent shadow-none",
  );
}

export function brandButtonVariant(tone: Tone = "primary") {
  return tone === "primary" ? ("default" as const) : ("outline" as const);
}

/** A store link styled as Lamplight's button. */
export function BrandLinkButton({
  to,
  tone = "primary",
  size = "md",
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  tone?: Tone;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      variant={brandButtonVariant(tone)}
      className={cn(brandButtonClass(tone, size), className)}
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </Button>
  );
}
