import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { BookCover } from "~/components/book/BookCover";
import { Button } from "~/components/ui/button";
import { brand } from "~/content/brand";
import { money } from "~/content/offers";
import { ratingCount, ratingLabel } from "~/content/proof";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

import { useSelection } from "./selection";

/** Appears once the main button has scrolled out of view, mirroring the selection. */
export function StickyCart() {
  const { ctaRef, bundle, price, colours, canAdd, adding, addToCart } =
    useSelection();
  const { copy } = useOffer();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const button = ctaRef.current;
    if (!button) return;
    // The root reaches far below the viewport, so the button only stops
    // intersecting once the shopper has scrolled past it, not before reaching it.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry ? !entry.isIntersecting : false),
      { rootMargin: "0px 0px 100000px 0px" },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [ctaRef]);

  async function add() {
    if (await addToCart()) return;
    // The cart store isn't ready yet: send the main button's form instead.
    const cta = ctaRef.current;
    cta?.form?.requestSubmit(cta);
  }

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "bg-card/95 text-card-foreground fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur transition-transform duration-300 motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        {/* The first guide's cover, flat. */}
        <BookCover
          view="front"
          colour={colours[0]}
          label=""
          className="hidden w-8 shrink-0 sm:block"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {brand.productName} · {brand.bundleNames[bundle.id].title} ·{" "}
            {colours.map((c) => brand.store.colourNames[c]).join(" + ")}
          </p>
          <p className="text-sm tabular-nums">
            <span className="me-2 hidden items-center gap-1 align-middle md:inline-flex">
              <StarIcon
                aria-hidden
                className="text-highlight size-3.5 fill-current"
              />
              <span aria-hidden="true">
                {ratingLabel} ({ratingCount})
              </span>
              <span className="sr-only">
                Rated {ratingLabel} out of 5 from {ratingCount} reviews
              </span>
            </span>
            <span className="font-semibold">{money(price.total)}</span>{" "}
            <s className="text-muted-foreground">{money(price.compareAt)}</s>{" "}
            <span className="text-primary hidden sm:inline">
              · save {money(price.saving)}
            </span>
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            add().catch(() => {});
          }}
          disabled={!canAdd || adding}
          aria-busy={adding}
          data-testid="sticky-add-to-cart"
          className="font-heading hover:bg-foreground hover:text-background h-11 shrink-0 rounded-sm px-5 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase"
        >
          <span className="sm:hidden">{brand.offers.standard.cta}</span>
          <span className="hidden sm:inline">{copy.cta}</span>
        </Button>
      </div>
    </div>
  );
}
