// Lamplight's brand home, ported from the mock's components/store/Home.tsx
// (lamplight branch): hero, trust, featured covers, inside the guide, story,
// reviews and newsletter.

import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { BOOK_STAGE, BookCover } from "~/components/book/BookCover";
import { BookIndex, LookInsideButton } from "~/components/book/LookInside";
import { SamplePage } from "~/components/book/SamplePage";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { RatingSummary } from "~/components/proof/Rating";
import { ReviewCard } from "~/components/proof/ReviewCard";
import { TrustRow } from "~/components/proof/TrustRow";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { samplePages } from "~/content/books";
import { brand } from "~/content/brand";
import { LEAD_COLOUR, type ColourId } from "~/content/catalog";
import { money } from "~/content/offers";
import { fillProof, ratingCount } from "~/content/proof";
import { wallReviews } from "~/content/reviews";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

import {
  BrandLinkButton,
  brandButtonClass,
  brandButtonVariant,
} from "./BrandButton";
import { ColourSwatches, ColourThumbs } from "./ColourSwatches";
import { PRODUCT_PATH, storePaths } from "./nav";

const home = brand.store.home;

/** Lamplight's section heading: a calm serif in a regular weight. */
export const HEADING =
  "font-heading text-4xl leading-tight font-medium text-balance sm:text-5xl";

/** The soft drop shadow under a printed sample page. */
const PAGE_SHADOW = "shadow-[0_24px_50px_-28px] shadow-foreground/50";

function samplePage(bookId: string) {
  return samplePages.find((page) => page.bookId === bookId) ?? samplePages[0];
}

export function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Featured />
      <Inside />
      <Story />
      <ReviewsTeaser />
      <Newsletter />
    </>
  );
}

/* ---------------- Hero ---------------- */

/** A full-bleed photo with a slow zoom, the words rising in at the bottom left. */
function Hero() {
  const hero = home.hero;
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="bg-foreground text-background relative isolate min-h-[85svh] overflow-hidden"
    >
      <Img
        image={hero.image}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-[35%_center] motion-safe:animate-kenburns"
      />
      <div
        aria-hidden="true"
        className="from-foreground/85 via-foreground/40 to-foreground/10 absolute inset-0 -z-10 bg-linear-to-t"
      />
      <div className="mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-4 pt-24 pb-16 sm:px-6 sm:pb-24">
        <div className="max-w-2xl space-y-6 motion-safe:animate-hero-rise">
          <Eyebrow className="text-background/85">{hero.eyebrow}</Eyebrow>
          <h1
            id="home-hero-heading"
            className="font-heading text-5xl leading-[1.05] font-medium text-balance sm:text-7xl"
          >
            {hero.headline}
          </h1>
          <p className="text-background/85 max-w-lg text-lg leading-relaxed">
            {hero.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <BrandLinkButton to={PRODUCT_PATH} size="lg">
              {hero.cta}{" "}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </BrandLinkButton>
            <BrandLinkButton
              to={storePaths.how}
              size="lg"
              tone="secondary"
              className="border-background text-background hover:bg-background hover:text-foreground"
            >
              {hero.secondary}
            </BrandLinkButton>
          </div>
        </div>
      </div>
      <PlaceholderTag
        kind="competitor"
        label="Competitor photo, used as a placeholder"
        className="absolute end-4 bottom-4 sm:end-6"
      />
    </section>
  );
}

/* ---------------- Trust ---------------- */

function Trust() {
  return (
    <section
      aria-label="Shipping, guarantee and support"
      className="border-b py-10 sm:py-12"
    >
      <TrustRow className="mx-auto max-w-7xl px-4 sm:px-6" />
    </section>
  );
}

/* ---------------- Featured guide with live cover swap ---------------- */

function Featured() {
  const featured = home.featured;
  const { offer } = useOffer();
  const [colour, setColour] = useState<ColourId>(LEAD_COLOUR);
  const single =
    offer.bundles.find((bundle) => bundle.quantity === 1) ?? offer.bundles[0];

  return (
    <section
      aria-labelledby="home-featured-heading"
      className="bg-card text-card-foreground py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        {/* Sways gently on its own; drag to turn it, the swatches recolour it. */}
        <div
          className={cn(
            "flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm",
            BOOK_STAGE,
          )}
        >
          <BookCover
            colour={colour}
            interactive
            sway
            label={`${brand.productName}, ${brand.store.colourNames[colour]} cover: drag or use the arrow keys to turn it`}
            className="w-[42%]"
          />
        </div>
        <div className="space-y-6">
          <Eyebrow className="text-muted-foreground">
            {featured.eyebrow}
          </Eyebrow>
          <h2 id="home-featured-heading" className={HEADING}>
            {featured.headline}
          </h2>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
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

/* ---------------- Inside the guide: a sample page and all 66 books ---------------- */

function Inside() {
  const inside = home.inside;
  const exodus = samplePage("exodus");
  return (
    <section
      aria-labelledby="home-inside-heading"
      className="bg-secondary text-secondary-foreground py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SamplePage
            page={exodus}
            className={cn("mx-auto w-full max-w-md", PAGE_SHADOW)}
          />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <LookInsideButton initialBook={exodus.bookId}>
              Turn the sample pages
            </LookInsideButton>
            <PlaceholderTag
              kind="placeholder"
              label="Sample pages written for Lamplight, to be reviewed"
            />
          </div>
        </div>
        <div className="space-y-6">
          <Eyebrow>{inside.eyebrow}</Eyebrow>
          <h2 id="home-inside-heading" className={HEADING}>
            {inside.headline}
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            {inside.body}
          </p>
          <BookIndex className="pt-2" />
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
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <figure>
          <div className="overflow-hidden rounded-sm">
            <Img
              image={story.image}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3">
            <PlaceholderTag
              kind="competitor"
              label="Competitor photo, used as a placeholder"
            />
          </figcaption>
        </figure>
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

/* ---------------- Reviews ---------------- */

function ReviewsTeaser() {
  const picks = wallReviews.slice(0, 6);
  const reviewsHref = `${PRODUCT_PATH}#reviews`;
  return (
    <section
      aria-labelledby="home-reviews-heading"
      className="bg-card text-card-foreground border-y py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 space-y-3 text-center">
          <h2 id="home-reviews-heading" className={HEADING}>
            {home.reviewsHeadline}
          </h2>
          <p className="text-muted-foreground text-lg">
            {fillProof(brand.pdp.reviewsSub)}
          </p>
        </div>
        <RatingSummary className="mx-auto mb-12 max-w-3xl" />
        <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {picks.map((review, i) => (
            <li key={review.id} className="flex">
              <ReviewCard review={review} index={i} className="flex-1" />
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link
            to={reviewsHref}
            className="font-heading inline-flex min-h-11 items-center gap-1.5 text-sm font-medium tracking-[0.12em] uppercase underline underline-offset-4"
          >
            Read all {ratingCount} reviews{" "}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
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
    <section aria-labelledby="home-newsletter-heading" className="py-20">
      <div className="mx-auto max-w-2xl space-y-5 px-4 text-center sm:px-6">
        <h2
          id="home-newsletter-heading"
          className="font-heading text-3xl font-medium sm:text-4xl"
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
            className="bg-card text-card-foreground border-foreground/40 h-12 min-w-0 flex-1 rounded-sm px-4"
          />
          <Button
            type="submit"
            disabled={!ready}
            variant={brandButtonVariant("primary")}
            className={cn(brandButtonClass("primary", "lg"), "px-6")}
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
