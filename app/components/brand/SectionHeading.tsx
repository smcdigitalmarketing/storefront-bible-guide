import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

import { Eyebrow } from "./Eyebrow";

/**
 * A section's eyebrow, heading and subheading in Lamplight's type: gold small
 * caps over a light serif heading, centred where the section is.
 */
export function SectionHeading({
  id,
  eyebrow,
  children,
  sub,
  align = "start",
  className,
  onDark,
}: {
  id?: string;
  eyebrow?: string;
  children: ReactNode;
  sub?: string;
  align?: "start" | "center";
  className?: string;
  /** On a dark band: the eyebrow is foil gold and muted text uses opacity. */
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={cn("text-sm", onDark && "text-foil")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        id={id}
        className="font-heading text-4xl leading-[1.08] font-normal text-balance sm:text-5xl"
      >
        {children}
      </h2>
      {sub ? (
        <p
          className={cn(
            "text-base sm:text-lg",
            onDark ? "opacity-80" : "text-muted-foreground",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
