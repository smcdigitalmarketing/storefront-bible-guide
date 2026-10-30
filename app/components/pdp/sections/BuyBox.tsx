import { useId, type FormEvent } from "react";

import { BookCover, BOOK_STAGE } from "~/components/book/BookCover";
import { LookInsideButton } from "~/components/book/LookInside";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { brand } from "~/content/brand";
import { getColour, type ColourId } from "~/content/catalog";
import { gifts, money, pricing } from "~/content/offers";
import type { Bundle } from "~/content/types";
import { BUNDLE_ATTRIBUTE, OFFER_ATTRIBUTE } from "~/lib/bundle-cart";
import { useCartForm } from "~/lib/cart";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

import { CtaNote } from "../blocks/CtaNote";
import { useSelection } from "../selection";

/** SOP section 2: numbered steps, every bundle visible, no dropdowns. */
export function BuyBox() {
  const { offer, bundle: selected, setBundleId } = useSelection();
  const headingId = useId();

  return (
    <section
      data-sop-section="buy-box"
      aria-label="Choose your bundle"
      id="buy"
      className="scroll-mt-20"
    >
      <h2 id={headingId} className="font-heading mb-4 text-2xl font-medium">
        {brand.pdp.stepHeading}
      </h2>
      {/* Radix renders a native radio per item (name="bundle-lamplight") in
          the server HTML, so the content check can count the three bundles. */}
      <RadioGroup
        name={`bundle-${brand.id}`}
        value={selected.id}
        onValueChange={(value) => {
          const bundle = offer.bundles.find((b) => b.id === value);
          if (bundle) setBundleId(bundle.id);
        }}
        aria-labelledby={headingId}
        className="gap-0 border-t"
      >
        {offer.bundles.map((bundle) => (
          <BundleOption
            key={bundle.id}
            bundle={bundle}
            selected={bundle.id === selected.id}
          />
        ))}
      </RadioGroup>
      <ColourStep />
      <div className="mt-3 flex justify-end">
        <PlaceholderTag
          kind="illustrative"
          label="Illustrative bundles and prices"
        />
      </div>
      <MainCta />
      <CtaNote />
    </section>
  );
}

/** "a", "a and b", "a, b and c". */
function joinNames(names: string[]) {
  return names.length <= 2
    ? names.join(" and ")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** A bundle as a row in Lamplight's stacked list; the whole row is the radio's label. */
function BundleOption({
  bundle,
  selected,
}: {
  bundle: Bundle;
  selected: boolean;
}) {
  const { allColours } = useSelection();
  const id = useId();
  const p = pricing(bundle);
  const names = brand.bundleNames[bundle.id];

  return (
    <Label
      htmlFor={id}
      className={cn(
        "has-focus-visible:ring-ring/50 cursor-pointer gap-4 border-b px-1 py-4 leading-normal font-normal transition-colors has-focus-visible:ring-2 motion-reduce:transition-none sm:px-3",
        selected ? "bg-card" : "hover:bg-card/60",
      )}
    >
      {/* The visible radio dot: an ink ring, oxblood when chosen. */}
      <RadioGroupItem
        id={id}
        value={bundle.id}
        // The row's label wraps the radio, so name it directly.
        aria-label={`${names.title}, ${money(p.total)}, saving ${money(p.saving)}`}
        className="border-foreground/40 data-checked:border-primary size-5 data-checked:bg-transparent *:data-[slot=radio-group-indicator]:*:bg-primary"
      />
      <GuideStack
        count={bundle.quantity}
        colours={allColours}
        className="hidden h-14 w-20 sm:flex"
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-xl font-medium">
            {names.title}
          </span>
          {bundle.badge && (
            <Eyebrow asChild>
              <span className="text-primary text-[0.65rem] motion-safe:animate-badge-pop">
                {bundle.badge}
              </span>
            </Eyebrow>
          )}
        </span>
        <span className="text-muted-foreground block text-sm">
          {names.subtitle}
        </span>
        {bundle.gifts.length > 0 && (
          <span className="mt-1 block text-sm">
            + {joinNames(bundle.gifts.map((g) => gifts[g].name.toLowerCase()))},
            complimentary
          </span>
        )}
      </span>
      <span className="shrink-0 text-end">
        <span className="font-heading block text-xl tabular-nums">
          {money(p.total)}
        </span>
        <s className="text-muted-foreground block text-xs tabular-nums">
          {money(p.compareAt)}
        </s>
        <span className="text-primary block text-xs font-medium">
          Saving {money(p.saving)}
        </span>
        <span className="text-muted-foreground block text-xs tabular-nums">
          {money(p.perUnit)} each
        </span>
      </span>
    </Label>
  );
}

/** The bundle's guides as overlapping flat covers, in the covers picked so far. */
export function GuideStack({
  count,
  colours = [],
  className,
}: {
  count: number;
  /** Cover per guide; missing slots show the first. */
  colours?: ColourId[];
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative flex items-end justify-center", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <BookCover
          key={i}
          view="front"
          colour={colours[i] ?? colours[0] ?? "saddle"}
          label=""
          className={cn(
            "w-9 shrink-0 drop-shadow-sm",
            // Fixed overlaps: a percentage would be of the row, not the cover.
            i > 0 && (count > 3 ? "-ms-7" : "-ms-5"),
          )}
        />
      ))}
    </span>
  );
}

/**
 * The main add-to-cart button. Once the cart store is ready, the selection adds
 * one line per chosen cover and opens the cart. Until then (or with
 * JavaScript off) the form posts natively to Hydrogen's cart route: the
 * bundle's quantity of the first cover's variant, tagged with the bundle.
 */
function MainCta() {
  const {
    ctaRef,
    price,
    bundle,
    offerId,
    colours,
    colourVariant,
    canAdd,
    adding,
    addToCart,
  } = useSelection();
  const { copy } = useOffer();
  const { formProps, register } = useCartForm();
  const first = colours[0];
  const firstVariant = first ? colourVariant(first)?.variantId : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    // A re-submit from below: let the browser post the plain form.
    if (form.dataset.plainPost) return;
    // This handler only runs once React has hydrated, so add the whole bundle
    // (a line per cover). If the cart store never connects, fall back to the
    // plain post, which adds the bundle in the first cover.
    event.preventDefault();
    const submitter = (event.nativeEvent as globalThis.SubmitEvent).submitter;
    addToCart()
      .then((added) => {
        if (added) return;
        form.dataset.plainPost = "true";
        form.requestSubmit(submitter);
      })
      // Failures land in the cart state's errors, as with Hydrogen's own forms.
      .catch(() => {});
  }

  return (
    // formProps() supplies the cart route and method; our onSubmit replaces
    // its handler so the hydrated path adds the whole bundle.
    <form {...formProps()} onSubmit={handleSubmit} className="mt-4">
      <input
        type="hidden"
        {...register("merchandiseId", { value: firstVariant ?? "" })}
      />
      <input
        type="hidden"
        {...register("quantity", { value: bundle.quantity })}
      />
      <input
        type="hidden"
        {...register("attributeValue", {
          key: BUNDLE_ATTRIBUTE,
          value: bundle.id,
        })}
      />
      <input
        type="hidden"
        {...register("attributeValue", {
          key: OFFER_ATTRIBUTE,
          value: offerId,
        })}
      />
      <Button
        ref={ctaRef}
        {...register("add")}
        type="submit"
        size="lg"
        disabled={!canAdd || adding}
        aria-busy={adding}
        data-testid="add-to-cart"
        className="font-heading hover:bg-foreground hover:text-background h-auto w-full flex-wrap gap-x-3 gap-y-1 rounded-sm px-6 py-5 text-center text-sm font-semibold tracking-[0.12em] whitespace-normal uppercase"
      >
        <span>{canAdd ? copy.cta : "Unavailable"}</span>
        {canAdd && (
          <span className="tabular-nums opacity-90">
            · {money(price.total)}
          </span>
        )}
      </Button>
    </form>
  );
}

/** Step 2: a cover for every guide in the bundle, beside a book you can turn. */
function ColourStep() {
  const { bundle, colours, previewColour } = useSelection();
  const headingId = useId();
  const many = bundle.quantity > 1;

  return (
    <div role="group" aria-labelledby={headingId} className="mt-6">
      <h2 id={headingId} className="font-heading mb-3 text-2xl font-medium">
        {brand.pdp.colourStep}
      </h2>
      <div className="bg-card text-card-foreground grid grid-cols-[7rem_1fr] items-start gap-4 rounded-sm border p-3 sm:grid-cols-[8.5rem_1fr]">
        <div className="space-y-2">
          {/* Drag or use the arrow keys to turn it; a cover change keeps the angle. */}
          <div
            className={cn(
              BOOK_STAGE,
              "flex items-center justify-center rounded-sm px-4 pt-3 pb-5",
            )}
          >
            <BookCover colour={previewColour} interactive className="w-full" />
          </div>
          <LookInsideButton className="text-muted-foreground hover:text-foreground w-full justify-center text-xs" />
        </div>
        <div className="min-w-0 space-y-3">
          {colours.map((colour, i) => (
            <div
              key={i}
              className={cn("space-y-1.5", i > 0 && "border-t pt-3")}
            >
              {many && (
                <p className="text-muted-foreground text-xs font-semibold">
                  Guide {i + 1}
                </p>
              )}
              <CoverSwatches
                slot={i}
                value={colour}
                size={many ? "sm" : "md"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <PlaceholderTag
          kind="illustrative"
          label="Cover colours to be confirmed with the supplier"
        />
      </div>
    </div>
  );
}

/** One guide's cover: the covers the Shopify product sells, sold-out ones disabled. */
function CoverSwatches({
  slot,
  value,
  size,
}: {
  slot: number;
  value: ColourId;
  size: "sm" | "md";
}) {
  const { hero, setColour } = useSelection();

  return (
    <div className="flex flex-wrap items-center gap-1">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(next) => {
          const colour = hero.colours.find((c) => c.id === next);
          if (colour) setColour(slot, colour.id);
        }}
        aria-label={`Guide ${slot + 1} cover`}
        spacing={0.5}
        className="flex-wrap"
      >
        {hero.colours.map((colour) => (
          <ToggleGroupItem
            key={colour.id}
            value={colour.id}
            disabled={!colour.available}
            aria-label={colour.name}
            title={colour.name}
            className="size-11 rounded-full p-0 hover:bg-transparent data-[state=on]:bg-transparent"
          >
            <span
              aria-hidden="true"
              className={cn(
                "border-foreground/20 group-data-[state=on]/toggle:ring-foreground group-data-[state=on]/toggle:ring-offset-card group-hover/toggle:border-foreground/50 rounded-full border group-data-[state=on]/toggle:ring-2 group-data-[state=on]/toggle:ring-offset-2",
                size === "sm" ? "size-7" : "size-9",
              )}
              // Data, not styling: the cover leather from the catalogue.
              style={{ backgroundColor: getColour(colour.id).swatch }}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <span className="ms-1 text-sm font-medium">
        {brand.store.colourNames[value]}
      </span>
    </div>
  );
}
