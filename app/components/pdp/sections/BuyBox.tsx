import { CheckIcon } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Stars } from "~/components/proof/Rating";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { brand } from "~/content/brand";
import { getColour, type ColourId } from "~/content/catalog";
import { gifts, money, pricing } from "~/content/offers";
import { getReview } from "~/content/reviews";
import type { Bundle } from "~/content/types";
import { BUNDLE_ATTRIBUTE, OFFER_ATTRIBUTE } from "~/lib/bundle-cart";
import { useCartForm } from "~/lib/cart";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

import { CtaNote } from "../blocks/CtaNote";
import { useSelection } from "../selection";

/** SOP section 2: numbered step, every bundle visible, no dropdowns. */
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
      <h2 id={headingId} className="font-heading mb-4 text-xl font-extrabold">
        {brand.pdp.stepHeading}
      </h2>
      {/* Radix renders a native radio per item (name="bundle-flashpop") in the
          server HTML, so the content check can count the three bundles. */}
      <RadioGroup
        name={`bundle-${brand.id}`}
        value={selected.id}
        onValueChange={(value) => {
          const bundle = offer.bundles.find((b) => b.id === value);
          if (bundle) setBundleId(bundle.id);
        }}
        aria-labelledby={headingId}
        className="grid-cols-3 gap-2 pt-3 sm:gap-3"
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

/** A bundle as a card in Flashpop's "columns" picker; the whole card is the radio's label. */
function BundleOption({
  bundle,
  selected,
}: {
  bundle: Bundle;
  selected: boolean;
}) {
  const { offerId, allColours } = useSelection();
  const id = useId();
  const p = pricing(bundle);
  const names = brand.bundleNames[bundle.id];
  const bf = offerId === "early-black-friday";

  return (
    <Label
      htmlFor={id}
      className="block h-full cursor-pointer leading-normal font-normal"
    >
      <Card
        className={cn(
          "has-focus-visible:ring-ring relative h-full items-center gap-0 overflow-visible rounded-lg border-2 px-1.5 pt-5 pb-3 text-center shadow-none ring-0 transition has-focus-visible:ring-2 motion-reduce:transition-none sm:px-3",
          selected
            ? "border-border shadow-foreground shadow-[4px_4px_0_0]"
            : "border-border/15 hover:border-border/50",
          bf && selected && "bg-secondary text-secondary-foreground",
        )}
      >
        {/* Visually hidden: the card shows the state. "absolute" overrides
            the item's "relative" so it takes no room in the card. */}
        <RadioGroupItem
          id={id}
          value={bundle.id}
          className="absolute top-0 left-0 sr-only"
        />
        {bundle.badge && (
          // Wraps on narrow cards so neighbouring badges don't collide, and
          // sits above the selected burst so its text stays readable.
          <Badge className="bg-highlight font-heading text-highlight-foreground absolute -top-3 left-1/2 z-10 h-auto max-w-[calc(100%-1rem)] -translate-x-1/2 -rotate-3 px-2 py-1 text-center text-[10px] leading-none font-extrabold whitespace-normal uppercase sm:text-[11px]">
            {bundle.badge}
          </Badge>
        )}
        <CameraStack
          count={bundle.quantity}
          colours={allColours}
          className="h-12 sm:h-16"
        />
        <span className="font-heading mt-2 text-base leading-none font-extrabold sm:text-lg">
          {names.title}
        </span>
        <span className="text-muted-foreground mt-1 line-clamp-2 min-h-8 text-[11px] leading-tight sm:text-xs">
          {names.subtitle}
        </span>
        <span className="font-heading mt-2 text-[0.9rem] leading-none font-extrabold tabular-nums min-[420px]:text-lg sm:text-2xl lg:text-lg xl:text-2xl">
          {money(p.total)}
        </span>
        <s className="text-muted-foreground text-[11px] tabular-nums sm:text-xs">
          {money(p.compareAt)}
        </s>
        <Badge className="mt-1.5 h-auto px-1.5 text-[10px] font-bold sm:text-xs">
          Save {money(p.saving)}
        </Badge>
        <span className="text-muted-foreground mt-1.5 text-[11px] tabular-nums sm:text-xs">
          {money(p.perUnit)}/guide
        </span>
        <GiftThumbs bundle={bundle} className="mt-2 justify-center" />
        {selected && (
          <span
            aria-hidden="true"
            className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center"
          >
            <span className="bg-secondary absolute inset-0 size-full rounded-full" />
            <CheckIcon
              className="text-foreground relative size-4"
              strokeWidth={3}
            />
          </span>
        )}
      </Card>
    </Label>
  );
}

/** The bundle's cameras, fanned out, in the colours picked so far. */
export function CameraStack({
  count,
  colours = [],
  className,
}: {
  count: number;
  /** Colour per camera; missing slots show black. */
  colours?: ColourId[];
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative flex items-end justify-center", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <Img
          key={i}
          image="product-front"
          sizes="96px"
          alt=""
          className={cn(
            "aspect-square h-full w-auto object-contain mix-blend-multiply",
            i > 0 && "-ms-[45%]",
            count > 1 && i === 0 && "-rotate-6",
            count > 2 && i === 2 && "rotate-6",
          )}
        />
      ))}
    </span>
  );
}

function GiftThumbs({
  bundle,
  className,
}: {
  bundle: Bundle;
  className?: string;
}) {
  if (!bundle.gifts.length) {
    return (
      <span className={cn("text-[10px] text-current/60", className)}>
        No gifts
      </span>
    );
  }
  return (
    <span className={cn("flex flex-wrap items-center gap-1", className)}>
      {bundle.gifts.map((id) => (
        <span
          key={id}
          className="flex items-center gap-1"
          title={`Free ${gifts[id].name}`}
        >
          <Img
            image={gifts[id].image}
            sizes="32px"
            alt={gifts[id].name}
            className="bg-card size-7 rounded-md border border-current/20 object-contain"
          />
        </span>
      ))}
      <span className="text-[10px] font-bold uppercase">+ free</span>
    </span>
  );
}

/**
 * The main add-to-cart button. Once the cart store is ready, the selection adds
 * one line per chosen colour and opens the cart. Until then (or with
 * JavaScript off) the form posts natively to Hydrogen's cart route: the
 * bundle's quantity of the first colour's variant, tagged with the bundle.
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
    // (a line per colour). If the cart store never connects, fall back to the
    // plain post, which adds the bundle in the first colour.
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
        className="border-border font-heading shadow-foreground hover:bg-primary h-auto w-full flex-wrap gap-x-3 gap-y-1 rounded-full border-2 px-6 py-4 text-center text-lg font-extrabold whitespace-normal shadow-[4px_4px_0_0] hover:shadow-[2px_2px_0_0]"
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

/** Step 2: a colour for every camera in the bundle, with a large preview. */
function ColourStep() {
  const { bundle, colours, previewColour } = useSelection();
  const headingId = useId();

  return (
    <div role="group" aria-labelledby={headingId} className="mt-6">
      <h2 id={headingId} className="font-heading mb-3 text-xl font-extrabold">
        {brand.pdp.colourStep}
      </h2>
      {/* A narrower preview on phones keeps five 44px swatches on one row. */}
      <div className="border-border/15 bg-card text-card-foreground grid grid-cols-[5rem_1fr] items-center gap-3 rounded-lg border-2 p-2 sm:grid-cols-[8rem_1fr] sm:gap-4 sm:p-3">
        <div className="space-y-1.5">
          <Img
            image="product-front"
            sizes="8rem"
            alt={`${brand.productName}, ${brand.store.colourNames[previewColour]} cover`}
            className="aspect-square w-full rounded-xl object-cover"
          />
        </div>
        <div className="min-w-0 space-y-3">
          {colours.map((colour, i) => (
            <div key={i} className="space-y-1.5">
              {bundle.quantity > 1 && (
                <p className="text-muted-foreground text-xs">Camera {i + 1}</p>
              )}
              <CameraSwatches
                slot={i}
                value={colour}
                size={bundle.quantity > 1 ? "sm" : "md"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <PlaceholderTag
          kind="illustrative"
          label="Colour range to be confirmed with supplier"
        />
      </div>
    </div>
  );
}

/** One camera's colour: the colourways the Shopify product sells, sold-out ones disabled. */
function CameraSwatches({
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
        aria-label={`Camera ${slot + 1} colour`}
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
            className="relative size-11 rounded-full p-0 hover:bg-transparent data-[state=on]:bg-transparent"
          >
            {/* Ink top band over the body colour, like the camera. */}
            <span
              aria-hidden="true"
              className={cn(
                "border-foreground/20 group-data-[state=on]/toggle:ring-foreground group-data-[state=on]/toggle:ring-offset-card relative overflow-hidden rounded-full border transition group-data-[state=on]/toggle:ring-2 group-data-[state=on]/toggle:ring-offset-2 motion-safe:group-hover/toggle:scale-110",
                size === "sm" ? "size-7" : "size-9",
              )}
            >
              <span className="bg-foreground absolute inset-x-0 top-0 h-[38%]" />
              <span
                className="absolute inset-x-0 bottom-0 h-[62%]"
                style={{ backgroundColor: colour.swatch }}
              />
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <span className="ms-1 text-sm font-medium">
        {brand.store.colourNames[value]}
      </span>
    </div>
  );
}

/** One short placeholder review, shown under the button. */
export function ShortReview() {
  const review = getReview(brand.pdp.underButtonReview);

  return (
    <figure className="bg-accent text-accent-foreground mt-4 flex rotate-[-0.6deg] gap-3 rounded-lg p-4 text-sm">
      <div className="min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Stars rating={review.rating} className="size-3.5" />
          <span className="font-semibold">{review.name}</span>
          <PlaceholderTag kind="review-placeholder" />
        </div>
        <p className="font-semibold">{review.title}</p>
        <blockquote>“{review.body}”</blockquote>
        <figcaption className="text-accent-foreground/80 text-xs">
          {review.source}
        </figcaption>
      </div>
    </figure>
  );
}
