import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Tone = "primary" | "secondary";
type Size = "md" | "lg";

/**
 * Flashpop's sticker-style pill: an ink outline and, on the primary tone, an
 * offset ink shadow. Layered on the shadcn Button's default and outline variants.
 */
export function brandButtonClass(tone: Tone = "primary", size: Size = "md") {
  return cn(
    "font-heading rounded-full border-2 border-foreground font-extrabold whitespace-normal",
    size === "lg" ? "h-14 px-7 text-base" : "h-11 px-5 text-sm",
    tone === "primary"
      ? "shadow-[4px_4px_0_0] shadow-foreground hover:bg-primary motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[5px_6px_0_0]"
      : "bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground",
  );
}

export function brandButtonVariant(tone: Tone = "primary") {
  return tone === "primary" ? ("default" as const) : ("outline" as const);
}

/** A store link styled as Flashpop's pill button. */
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
