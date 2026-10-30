import { Eyebrow } from "~/components/brand/Eyebrow";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Gallery } from "~/components/gallery/Gallery";
import { RatingBadge } from "~/components/proof/Rating";
import { TrustRow } from "~/components/proof/TrustRow";
import { brand } from "~/content/brand";
import { money } from "~/content/offers";
import { fillProof } from "~/content/proof";
import { useOffer } from "~/lib/offer";

import { featureIcons } from "../icons";
import { useSelection } from "../selection";
import { BuyBox } from "./BuyBox";
import { UnderButton } from "./UnderButton";

/**
 * SOP sections 1–3 in Lamplight's "gallery-left" hero: a slightly wider
 * gallery beside the title, buy box and reassurances. They share one grid so
 * the buy box sits beside the gallery on desktop, but stay in SOP order in the
 * DOM and on mobile.
 */
export function HeroSections() {
  return (
    <div
      id="top"
      className="mx-auto grid max-w-7xl scroll-mt-20 grid-cols-1 gap-x-10 gap-y-6 px-4 pt-5 pb-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-[auto_auto_1fr] lg:gap-x-14 lg:pt-10"
    >
      <section
        data-sop-section="above-the-fold"
        aria-label="Product overview"
        className="contents"
      >
        <div className="lg:col-start-1 lg:row-span-3 lg:row-start-1">
          {/* top-22 clears the 4rem sticky header. */}
          <div className="lg:sticky lg:top-22">
            <Gallery />
          </div>
        </div>
        <div className="space-y-5 lg:col-start-2 lg:row-start-1">
          <TitleBlock />
          <PriceAndBullets />
        </div>
      </section>
      <div className="lg:col-start-2 lg:row-start-2">
        <BuyBox />
      </div>
      <div className="lg:col-start-2 lg:row-start-3">
        <UnderButton />
      </div>
    </div>
  );
}

function TitleBlock() {
  const { copy } = useOffer();

  return (
    <div className="space-y-3 motion-safe:animate-hero-rise">
      {copy.headline && (
        <Eyebrow className="text-primary">{copy.headline}</Eyebrow>
      )}
      <ProofLine />
      <h1 className="font-heading text-4xl leading-[1.08] font-light text-balance sm:text-6xl">
        <Eyebrow asChild>
          <span className="text-muted-foreground mb-4 block font-sans text-[0.75rem] sm:text-xs">
            {brand.productName}
          </span>
        </Eyebrow>
        <span>{capitalise(brand.pdp.titleBenefit)}</span>
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
        {brand.pdp.subheadline}
      </p>
    </div>
  );
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * SOP: social proof line above the title. The rating and customer count are
 * illustrative until verified reviews exist, and labelled as such.
 */
function ProofLine() {
  return (
    <div className="flex flex-col gap-1.5">
      <RatingBadge />
      <p
        data-proof="customers"
        className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
      >
        {fillProof(brand.pdp.proofLine)}
        <PlaceholderTag kind="illustrative" label="Illustrative count" />
      </p>
    </div>
  );
}

function PriceAndBullets() {
  const { price, bundle } = useSelection();
  const bundleName = brand.bundleNames[bundle.id].title;

  return (
    <div className="space-y-5">
      {/* The price between two thin rules. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-y py-4">
        <span className="font-heading text-3xl font-normal tabular-nums">
          {money(price.total)}
        </span>
        <s className="text-muted-foreground text-lg tabular-nums">
          {money(price.compareAt)}
        </s>
        <span className="text-primary text-sm font-semibold">
          You save {money(price.saving)}
        </span>
        <span className="text-muted-foreground w-full text-sm">
          {bundleName} · {money(price.perUnit)} per guide
          {price.giftValue > 0 &&
            ` · ${money(price.giftValue)} of gifts included`}
        </span>
        <PlaceholderTag kind="illustrative" />
      </div>

      <ul className="grid gap-3 gap-x-8 sm:grid-cols-2">
        {brand.pdp.bullets.map((bullet) => {
          const Icon = featureIcons[bullet.icon];
          return (
            <li
              key={bullet.text}
              className="flex items-start gap-3 text-[0.95rem] leading-snug"
            >
              <span
                aria-hidden="true"
                className="text-primary flex size-7 shrink-0 items-center justify-center"
              >
                <Icon className="size-[18px] stroke-[1.25]" />
              </span>
              <span className="pt-1">{bullet.text}</span>
            </li>
          );
        })}
      </ul>
      <TrustRow variant="strip" count={3} />
    </div>
  );
}
