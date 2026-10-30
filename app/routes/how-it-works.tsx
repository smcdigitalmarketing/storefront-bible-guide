import { Link } from "react-router";

import { BookIndex, LookInsideButton } from "~/components/book/LookInside";
import { SamplePage } from "~/components/book/SamplePage";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { BrandLinkButton } from "~/components/store/BrandButton";
import { PRODUCT_PATH, storePaths } from "~/components/store/nav";
import { PageTitle } from "~/components/store/PageTitle";
import { samplePages } from "~/content/books";
import { brand } from "~/content/brand";
import { product } from "~/content/product";
import { guideSteps } from "~/content/store-pages";
import {
  formatPageTitle,
  getShopNameFromRootMatch,
} from "~/lib/storefront-shop";

import type { Route } from "./+types/how-it-works";

export function meta({ matches }: Route.MetaArgs) {
  return [
    {
      title: formatPageTitle(
        brand.store.nav.how,
        getShopNameFromRootMatch(matches[0]),
      ),
    },
    { name: "description", content: brand.pdp.subheadline },
  ];
}

const HEADING = "font-heading text-3xl leading-tight font-medium sm:text-4xl";

/** The book whose sample page shows what every page holds. */
const SAMPLE_BOOK = "genesis";

export default function HowItWorks() {
  const page =
    samplePages.find((p) => p.bookId === SAMPLE_BOOK) ?? samplePages[0];
  return (
    <main className="flex-1 pb-24" id="main-content" tabIndex={-1}>
      <PageTitle
        eyebrow={brand.store.nav.how}
        title={brand.pdp.gallery.howItWorks.headline}
        intro={brand.pdp.subheadline}
      />
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6">
        <section aria-label="Four steps" className="space-y-6">
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {product.howItWorks.map((step, i) => (
              <li key={step.title}>
                <div className="overflow-hidden rounded-sm">
                  <Img
                    image={step.image}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="space-y-1 pt-4">
                  <Eyebrow className="text-muted-foreground">
                    Step {i + 1}
                  </Eyebrow>
                  <h2 className="font-heading text-2xl font-medium">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <PlaceholderTag
            kind="competitor"
            label="Step photos: competitor stand-ins, used as placeholders"
          />
        </section>

        <section
          aria-labelledby="page-heading"
          className="grid items-start gap-12 md:grid-cols-2"
        >
          <SamplePage
            page={page}
            className="shadow-foreground/50 mx-auto w-full max-w-md shadow-[0_24px_50px_-28px]"
          />
          <div className="space-y-5">
            <Eyebrow>Inside the guide</Eyebrow>
            <h2 id="page-heading" className={HEADING}>
              What&apos;s on every page
            </h2>
            <ol className="space-y-3">
              {product.callouts.map((callout, i) => (
                <li key={callout.title} className="flex gap-3">
                  <span className="font-heading text-primary w-6 shrink-0 text-lg font-medium tabular-nums">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{callout.title}</span>
                    <span className="text-muted-foreground">
                      {callout.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <LookInsideButton initialBook={page.bookId} />
              <PlaceholderTag
                kind="placeholder"
                label="Sample pages written for Lamplight, to be reviewed"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="habits-heading" className="space-y-8">
          <h2 id="habits-heading" className={HEADING}>
            Four habits for any book
          </h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {guideSteps.map((step, i) => (
              <li
                key={step.title}
                className="border-foreground space-y-2 border-t pt-5"
              >
                <span className="font-heading text-primary text-4xl font-medium">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              to={storePaths.guide}
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Read the full guide to using it
            </Link>
            <PlaceholderTag
              kind="placeholder"
              label="Reading habits written for Lamplight, to be reviewed"
            />
          </p>
        </section>

        <section aria-labelledby="books-heading" className="space-y-6">
          <h2 id="books-heading" className={HEADING}>
            All 66 books
          </h2>
          {/* The one index on this page: check:content counts 66 data-book entries. */}
          <BookIndex />
        </section>

        <section aria-labelledby="specs-heading" className="mx-auto max-w-3xl">
          <h2 id="specs-heading" className={`${HEADING} mb-6 text-center`}>
            Specs
          </h2>
          <dl className="divide-y border-y">
            {Object.values(product.facts).map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]"
              >
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="flex flex-wrap items-center gap-2">
                  {fact.value}
                  <PlaceholderTag
                    kind={fact.status === "tbc" ? "tbc" : "listed"}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex justify-center">
          <BrandLinkButton to={PRODUCT_PATH} size="lg">
            {brand.compare.cta}
          </BrandLinkButton>
        </div>
      </div>
    </main>
  );
}
