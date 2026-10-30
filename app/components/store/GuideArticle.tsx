import { Link } from "react-router";

import { LookInsideButton } from "~/components/book/LookInside";
import { SamplePage } from "~/components/book/SamplePage";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { samplePages } from "~/content/books";
import { brand } from "~/content/brand";
import { guideArticle, guideSteps } from "~/content/store-pages";

import { BrandLinkButton } from "./BrandButton";
import { PRODUCT_PATH, storePaths } from "./nav";

/** The book whose sample page illustrates the guide. */
const SAMPLE_BOOK = "john";

/** "How to read any book of the Bible" (the mock's article route, Guide). */
export function GuideArticle() {
  const page =
    samplePages.find((p) => p.bookId === SAMPLE_BOOK) ?? samplePages[0];
  return (
    <article
      data-testid="guide-article"
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16"
    >
      <Link
        to={storePaths.journal}
        className="text-muted-foreground inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
      >
        ← {brand.store.nav.journal}
      </Link>
      <Eyebrow className="text-muted-foreground mt-6">
        {guideArticle.kicker} · {guideArticle.readTime}
      </Eyebrow>
      <h1 className="font-heading mt-3 text-4xl leading-[1.08] font-medium text-balance sm:text-6xl">
        {guideArticle.headline}
      </h1>
      <p className="font-heading text-muted-foreground mt-4 text-xl italic sm:text-2xl">
        {guideArticle.dek}
      </p>
      <figure className="mt-8">
        <Img
          image={guideArticle.image}
          priority
          sizes="(min-width: 768px) 720px, 100vw"
          className="aspect-[4/3] w-full rounded-sm object-cover"
        />
        <figcaption className="mt-3">
          <PlaceholderTag
            kind="competitor"
            label="Competitor photo of their interior page, used as a placeholder"
          />
        </figcaption>
      </figure>

      <ol className="mt-12 space-y-8">
        {guideSteps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
            <span className="font-heading border-foreground flex size-12 items-center justify-center rounded-full border text-xl font-medium">
              {i + 1}
            </span>
            <div className="space-y-1 pt-2">
              <h2 className="font-heading text-2xl font-medium">
                {step.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        <PlaceholderTag
          kind="placeholder"
          label="Reading habits written for Lamplight, to be reviewed"
        />
      </p>

      <section aria-labelledby="guide-sample-heading" className="mt-14">
        <div className="mb-6 flex items-center gap-4">
          <span aria-hidden="true" className="bg-border h-px flex-1" />
          <h2
            id="guide-sample-heading"
            className="font-heading text-center text-2xl font-medium"
          >
            What a page looks like
          </h2>
          <span aria-hidden="true" className="bg-border h-px flex-1" />
        </div>
        <SamplePage
          page={page}
          className="shadow-foreground/50 mx-auto w-full max-w-md shadow-[0_24px_50px_-28px]"
        />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <LookInsideButton initialBook={page.bookId} />
          <PlaceholderTag
            kind="placeholder"
            label="Sample page written for Lamplight, to be reviewed"
          />
        </div>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <BrandLinkButton to={PRODUCT_PATH}>
          {brand.store.products.guide.name}
        </BrandLinkButton>
        <BrandLinkButton to={storePaths.how} tone="secondary">
          {brand.store.nav.how}
        </BrandLinkButton>
      </div>
    </article>
  );
}
