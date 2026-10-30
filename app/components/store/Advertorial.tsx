// The advertorial, ported from the mock's components/advertorial/Advertorial.tsx
// (Lamplight's long-read essay, EssayLayout). It stays marked "Brand content"
// and its calls to action go to the Lamplight Bible Guide page.

import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { BOOK_STAGE, BookCover } from "~/components/book/BookCover";
import { Verse } from "~/components/book/SamplePage";
import { DoubleRule } from "~/components/brand/DoubleRule";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { featureIcons } from "~/components/pdp/icons";
import { brand } from "~/content/brand";
import { LEAD_COLOUR } from "~/content/catalog";
import type { AdvertorialSection } from "~/content/types";
import { cn } from "~/lib/utils";

import { BrandLinkButton } from "./BrandButton";
import { PRODUCT_PATH, storePaths } from "./nav";

const UPDATED = "23 October 2026";

/** The essay's section numbers, set between thin rules. */
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** The product card sits before this section (IV). */
const PRODUCT_CARD_BEFORE = 3;

function Byline({ className }: { className?: string }) {
  const a = brand.advertorial;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 text-sm",
        className,
      )}
    >
      <span className="font-semibold">{a.byline}</span>
      <span aria-hidden="true">·</span>
      <span>Updated {UPDATED}</span>
      <span aria-hidden="true">·</span>
      <span>{a.readTime}</span>
      <span
        data-testid="brand-content"
        className="rounded-sm border border-current px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase opacity-80"
      >
        Brand content
      </span>
    </div>
  );
}

function CtaButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <BrandLinkButton to={PRODUCT_PATH} size="lg" className={className}>
      {children}
      <ArrowRightIcon className="size-4" aria-hidden="true" />
    </BrandLinkButton>
  );
}

/** The natural product introduction, placed before section IV. */
function MeetTheGuide() {
  return (
    <aside
      aria-label={brand.productName}
      className="bg-card text-card-foreground my-14 grid items-center gap-6 border-y border-foreground p-6 sm:grid-cols-[12rem_1fr] sm:p-8"
    >
      <div
        className={cn(
          "flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm",
          BOOK_STAGE,
        )}
      >
        <BookCover
          colour={LEAD_COLOUR}
          sway
          label={`${brand.productName}, ${brand.store.colourNames[LEAD_COLOUR]} cover`}
          className="w-[46%]"
        />
      </div>
      <div className="space-y-3">
        <Eyebrow>Meet the guide</Eyebrow>
        <h3 className="font-heading text-2xl font-medium">
          {brand.productName}
        </h3>
        <ul role="list" className="space-y-1.5 text-sm">
          {brand.pdp.bullets.map((bullet) => {
            const Icon = featureIcons[bullet.icon];
            return (
              <li key={bullet.text} className="flex items-center gap-2">
                <Icon
                  className="text-highlight size-4 shrink-0"
                  aria-hidden="true"
                />
                {bullet.text}
              </li>
            );
          })}
        </ul>
        <CtaButton className="mt-2">{brand.compare.cta}</CtaButton>
      </div>
    </aside>
  );
}

/** A section number between two thin rules. */
function NumeralRule({ numeral }: { numeral: string }) {
  return (
    <div aria-hidden="true" className="mb-6 flex items-center gap-4">
      <span className="bg-border h-px flex-1" />
      <span className="font-heading text-highlight text-lg tracking-[0.2em]">
        {numeral}
      </span>
      <span className="bg-border h-px flex-1" />
    </div>
  );
}

function SectionImage({ section }: { section: AdvertorialSection }) {
  if (!section.image) return null;
  return (
    <figure className="-mx-4 mt-8 sm:-mx-16">
      <Img
        image={section.image}
        sizes="(min-width: 768px) 800px, 100vw"
        className="aspect-[4/3] w-full object-cover sm:rounded-sm"
      />
      <figcaption className="text-muted-foreground mt-3 flex flex-wrap items-center justify-center gap-2 px-4 text-center text-sm italic">
        {section.caption ? <span>{section.caption}</span> : null}
        <PlaceholderTag kind="competitor" className="not-italic" />
      </figcaption>
    </figure>
  );
}

/** Lamplight's long-read essay. */
export function AdvertorialArticle() {
  const a = brand.advertorial;
  return (
    <article data-testid="advertorial" className="py-12 sm:py-20">
      <header className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Eyebrow className="text-muted-foreground">{a.kicker}</Eyebrow>
        <h1 className="font-heading mt-6 text-[2.6rem] leading-[1.05] font-normal text-balance sm:text-7xl">
          {a.headline}
        </h1>
        <p className="font-heading text-muted-foreground mt-6 text-xl italic sm:text-2xl">
          {a.dek}
        </p>
        <Byline className="text-muted-foreground mt-8 justify-center" />
      </header>

      <figure className="mx-auto mt-12 max-w-6xl sm:px-6">
        <Img
          image={a.leadImage}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          className="aspect-[3/2] w-full object-cover sm:rounded-sm"
        />
        <figcaption className="text-muted-foreground mt-3 flex flex-wrap items-center justify-center gap-2 px-4 text-center text-sm italic sm:px-0">
          <span>{a.leadCaption}</span>
          <PlaceholderTag kind="competitor" className="not-italic" />
        </figcaption>
      </figure>

      <div className="mx-auto mt-12 max-w-2xl px-4 text-lg leading-[1.8] sm:px-6">
        {a.intro.map((paragraph, i) => (
          <p
            key={paragraph}
            className={cn(
              "mb-6",
              i === 0 &&
                "first-letter:font-heading first-letter:text-primary first-letter:float-left first-letter:me-3 first-letter:text-[4.6rem] first-letter:leading-[0.8]",
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {a.sections.map((section, i) => (
        <section
          key={section.title}
          aria-labelledby={`essay-section-${i + 1}`}
          className="mx-auto mt-16 max-w-2xl px-4 sm:px-6"
        >
          {i === PRODUCT_CARD_BEFORE ? <MeetTheGuide /> : null}
          <NumeralRule numeral={NUMERALS[i] ?? String(i + 1)} />
          <h2
            id={`essay-section-${i + 1}`}
            className="font-heading text-center text-3xl leading-tight font-medium text-balance sm:text-4xl"
          >
            {section.title}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-[1.8]">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.verse ? (
              <Verse
                id={section.verse}
                className="border-y py-6 text-center"
                quoteClassName="font-heading text-2xl leading-snug italic"
              />
            ) : null}
            {section.placeholder ? (
              <PlaceholderTag kind="placeholder" label={section.placeholder} />
            ) : null}
          </div>
          <SectionImage section={section} />
          {section.cta ? (
            <Link
              to={storePaths.how}
              className="text-primary mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
            >
              {section.cta}{" "}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          ) : null}
        </section>
      ))}

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Closing />
      </div>
    </article>
  );
}

function Closing() {
  const { closing } = brand.advertorial;
  return (
    <section aria-label="Shop the guide" className="mt-20 text-center">
      <DoubleRule />
      <div className="px-2 py-10 sm:py-12">
        <h2 className="font-heading text-3xl font-medium text-balance sm:text-4xl">
          {closing.headline}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
          {closing.body}
        </p>
        <CtaButton className="mt-8">{closing.cta}</CtaButton>
        <div className="mt-6 flex justify-center">
          <PlaceholderTag
            kind="placeholder"
            label="Concept copy · no claims beyond listed specs"
          />
        </div>
      </div>
      <DoubleRule />
    </section>
  );
}
