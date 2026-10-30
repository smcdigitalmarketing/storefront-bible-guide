// Flashpop's brand home, ported from the mock's components/store/Home.tsx
// (flashpop branches only): hero, ticker, featured camera, the 360° angles,
// reviews, story and newsletter.

import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { RatingBadge } from "~/components/proof/Rating";
import { ReviewCard } from "~/components/proof/ReviewCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { brand } from "~/content/brand";
import { LEAD_COLOUR, type ColourId } from "~/content/catalog";
import { money } from "~/content/offers";
import { fillProof, ratingCount } from "~/content/proof";
import { wallReviews } from "~/content/reviews";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

import { BrandLinkButton } from "./BrandButton";
import { ColourSwatches, ColourThumbs } from "./ColourSwatches";
import { PRODUCT_PATH, storePaths } from "./nav";

const home = brand.store.home;

/** Flashpop's section heading (the mock's useHeading, flashpop branch). */
export const HEADING =
  "font-heading text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl";

/** Flashpop's white print frame (the mock's fp-print). */
const PRINT = "bg-card p-2 pb-7 shadow-xl";

export function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Featured />
      <ReviewsTeaser />
      <Story />
      <Newsletter />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const hero = home.hero;
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-24">
        <div className="space-y-6 motion-safe:animate-hero-rise">
          <p className="bg-secondary font-heading text-secondary-foreground inline-block -rotate-2 rounded-full px-4 py-1.5 text-sm font-bold">
            {hero.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="font-heading text-6xl leading-[0.88] font-extrabold tracking-[-0.045em] sm:text-8xl"
          >
            {hero.headline.split(". ").map((part, i, all) => (
              <span
                key={part}
                className={cn("block", i === 1 && "text-primary")}
              >
                {part}
                {i < all.length - 1 ? "." : ""}
              </span>
            ))}
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">{hero.sub}</p>
          <div className="flex flex-wrap gap-3">
            <BrandLinkButton to={PRODUCT_PATH} size="lg">
              {hero.cta}{" "}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </BrandLinkButton>
            <BrandLinkButton to={storePaths.how} size="lg" tone="secondary">
              {hero.secondary}
            </BrandLinkButton>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div
            className={cn(
              PRINT,
              "absolute inset-x-[6%] top-[4%] rotate-2 transition duration-500 hover:rotate-0",
            )}
          >
            <Img
              image={hero.image}
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div
            className={cn(
              PRINT,
              "absolute bottom-[2%] left-0 w-[46%] -rotate-6 transition duration-500 hover:rotate-0",
            )}
          >
            <Img
              image="flatlay-orange"
              sizes="25vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div
            className={cn(
              PRINT,
              "absolute right-[2%] bottom-[8%] w-[42%] rotate-[5deg] transition duration-500 hover:rotate-0",
            )}
          >
            <Img
              image="product-angle"
              sizes="25vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <Sticker className="top-0 -left-2 rotate-[-12deg]" tone="pop">
            No screen
          </Sticker>
          <Sticker className="right-0 bottom-[44%] rotate-12" tone="alt">
            6 looks
          </Sticker>
          <PlaceholderTag
            kind="competitor"
            label="Left photo: reference camera sample"
            className="absolute -bottom-6 left-0"
          />
        </div>
      </div>
    </section>
  );
}

function Sticker({
  children,
  className,
  tone,
}: {
  children: ReactNode;
  className?: string;
  tone: "pop" | "alt";
}) {
  return (
    <span
      className={cn(
        "absolute flex size-24 items-center justify-center motion-safe:animate-wobble sm:size-28",
        className,
      )}
    >
      <span className="font-heading text-foreground relative text-center text-sm leading-tight font-extrabold">
        {children}
      </span>
    </span>
  );
}

/* ---------------- Ticker ---------------- */

function Ticker() {
  const items = [...home.ticker, ...home.ticker];
  return (
    <div className="overflow-x-clip py-2">
      <div className="bg-highlight text-highlight-foreground -rotate-1 overflow-hidden border-y-2 py-3">
        <p className="sr-only">{home.ticker.join(", ")}</p>
        {/* Two copies of the doubled list: the marquee slides by half its width. */}
        <ul
          className="flex w-max gap-8 motion-safe:animate-marquee"
          aria-hidden="true"
        >
          {[...items, ...items].map((item, i) => (
            <li
              key={i}
              className="font-heading flex items-center gap-8 text-lg font-extrabold whitespace-nowrap uppercase"
            >
              {item}
              <span aria-hidden>·</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Featured camera with live colour swap ---------------- */

function Featured() {
  const featured = home.featured;
  const { offer } = useOffer();
  const [colour, setColour] = useState<ColourId>(LEAD_COLOUR);
  const single =
    offer.bundles.find((bundle) => bundle.quantity === 1) ?? offer.bundles[0];

  return (
    <section aria-labelledby="home-featured-heading" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="bg-card relative aspect-square overflow-hidden rounded-3xl border-2">
          {/* Turns slowly on its own; the swatches recolour it at the same angle. */}
          <Img
            image="product-front"
            alt={`${brand.productName}, ${brand.store.colourNames[colour]}`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <p className="font-heading text-primary text-sm font-bold">
            {featured.eyebrow}
          </p>
          <h2 id="home-featured-heading" className={HEADING}>
            {featured.headline}
          </h2>
          <p className="text-muted-foreground max-w-md text-lg">
            {featured.body}
          </p>
          <ColourSwatches value={colour} onChange={setColour} />
          <ColourThumbs value={colour} onChange={setColour} />
          <div className="flex flex-wrap items-center gap-4">
            <BrandLinkButton to={`${PRODUCT_PATH}?colour=${colour}`} size="lg">
              {featured.cta} · {money(single.price)}
            </BrandLinkButton>
            <PlaceholderTag
              kind="illustrative"
              label="Illustrative price and colour range"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */

function ReviewsTeaser() {
  const picks = wallReviews.slice(0, 6);
  const reviewsHref = `${PRODUCT_PATH}#reviews`;
  return (
    <section
      aria-labelledby="home-reviews-heading"
      className="bg-primary text-primary-foreground py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 space-y-3">
          <h2 id="home-reviews-heading" className={HEADING}>
            {home.reviewsHeadline}
          </h2>
          <p className="text-lg">{fillProof(brand.pdp.reviewsSub)}</p>
        </div>
        <RatingBadge href={reviewsHref} onDark className="mb-10" />
        <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {picks.map((review, i) => (
            <li key={review.id} className="flex">
              <ReviewCard review={review} index={i} className="flex-1" />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            to={reviewsHref}
            className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4"
          >
            Read all {ratingCount} reviews{" "}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Story ---------------- */

function Story() {
  const story = home.story;
  return (
    <section aria-labelledby="home-story-heading" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div className={cn(PRINT, "-rotate-2")}>
          <Img
            image={story.image}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 id="home-story-heading" className={HEADING}>
            {story.headline}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {story.body}
          </p>
          <BrandLinkButton to={storePaths.about} tone="secondary">
            {story.cta}
          </BrandLinkButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

function Newsletter() {
  const copy = home.newsletter;
  // No sign-up provider yet: the form only works once hydrated, so it never
  // falls back to a native submit that would put the email in the URL.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section
      aria-labelledby="home-newsletter-heading"
      className="bg-secondary text-secondary-foreground py-20"
    >
      <div className="mx-auto max-w-2xl space-y-5 px-4 text-center sm:px-6">
        <h2
          id="home-newsletter-heading"
          className="font-heading text-3xl font-extrabold sm:text-4xl"
        >
          {copy.headline}
        </h2>
        <p className="text-muted-foreground">{copy.body}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            toast("Sign-up isn't connected yet", {
              description:
                "There's no mailing list behind this form yet, so your email wasn't saved or sent.",
            });
          }}
          className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <Input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            aria-label="Email address"
            className="bg-card text-card-foreground h-12 min-w-0 flex-1 rounded-full border-2 px-4"
          />
          <Button
            type="submit"
            disabled={!ready}
            className="font-heading border-foreground bg-foreground text-background hover:bg-foreground/85 h-12 rounded-full border-2 px-6 font-extrabold"
          >
            {copy.cta}
          </Button>
        </form>
        <div className="flex justify-center">
          <PlaceholderTag
            kind="placeholder"
            label="Sign-up not connected yet · nothing is sent"
          />
        </div>
      </div>
    </section>
  );
}
