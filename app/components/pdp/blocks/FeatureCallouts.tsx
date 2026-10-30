import { useState, type CSSProperties } from "react";

import { SamplePage } from "~/components/book/SamplePage";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { SectionHeading } from "~/components/brand/SectionHeading";
import { Button } from "~/components/ui/button";
import { brand } from "~/content/brand";
import { samplePages } from "~/content/books";
import { product } from "~/content/product";
import { cn } from "~/lib/utils";

/** What every page holds, pinned on the John sample page. */
const JOHN = samplePages.find((page) => page.bookId === "john")!;

/**
 * Numbered pins on the John sample page with a matching list. Hovering or
 * focusing either side highlights the other; on phones the pins stay and the
 * list sits under the page.
 */
export function FeatureCallouts() {
  const [active, setActive] = useState<number | null>(null);
  const callouts = product.callouts;

  // Round pins with italic serif numerals.
  const pin = (i: number) =>
    cn(
      "flex size-7 items-center justify-center rounded-full font-heading text-sm font-normal italic tabular-nums transition motion-reduce:transition-none sm:size-8 sm:text-base",
      active === i
        ? "scale-125 bg-primary text-primary-foreground"
        : "bg-card text-foreground shadow-md",
    );

  return (
    <div
      data-block="callouts"
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6"
    >
      <SectionHeading eyebrow={`${callouts.length} details`} align="center">
        {brand.pdp.calloutsHeadline}
      </SectionHeading>
      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div className="relative mx-auto w-full max-w-[34rem] shadow-[0_24px_50px_-28px] shadow-foreground/50">
          <SamplePage page={JOHN} />
          {callouts.map((callout, i) => (
            // The wrapper does the positioning, so the button's own press
            // nudge doesn't fight the centring translate.
            <span
              key={callout.title}
              className="absolute top-(--y) left-(--x) -translate-x-1/2 -translate-y-1/2"
              style={
                {
                  "--x": `${callout.x}%`,
                  "--y": `${callout.y}%`,
                } as CSSProperties
              }
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${i + 1}: ${callout.title}`}
                aria-describedby={`callout-${i}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
                className="size-11 rounded-full hover:bg-transparent aria-expanded:bg-transparent"
              >
                <span aria-hidden className={pin(i)}>
                  {i + 1}
                </span>
              </Button>
            </span>
          ))}
        </div>
        <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          {callouts.map((callout, i) => (
            <li
              key={callout.title}
              id={`callout-${i}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "flex gap-4 rounded-sm p-3 transition motion-reduce:transition-none",
                active === i && "bg-foreground/5",
              )}
            >
              <span aria-hidden className={cn(pin(i), "shrink-0")}>
                {i + 1}
              </span>
              <span>
                <span className="block font-heading text-lg font-normal">
                  {callout.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {callout.body}
                </span>
              </span>
            </li>
          ))}
          <li className="px-3 pt-3">
            <PlaceholderTag
              kind="listed"
              label="Sample page, to be reviewed before print"
            />
          </li>
        </ol>
      </div>
    </div>
  );
}
