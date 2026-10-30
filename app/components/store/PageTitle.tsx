import { Eyebrow } from "~/components/brand/Eyebrow";
import { cn } from "~/lib/utils";

/**
 * A store page's small-caps eyebrow, serif title and intro. Lamplight centres
 * its page titles; `align="start"` sets one flush left.
 */
export function PageTitle({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const centred = align === "center";
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20",
        centred && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className="text-muted-foreground mb-4">{eyebrow}</Eyebrow>
      ) : null}
      <h1
        className={cn(
          "font-heading max-w-3xl text-5xl leading-[1.05] font-normal text-balance sm:text-6xl",
          centred && "mx-auto",
        )}
      >
        {title}
      </h1>
      {intro ? (
        <p
          className={cn(
            "text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed",
            centred && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
