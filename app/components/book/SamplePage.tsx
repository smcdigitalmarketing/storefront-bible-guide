import { getBook, type SamplePage as Page } from "~/content/books";
import { getVerse, type VerseRef } from "~/content/scripture";
import { cn } from "~/lib/utils";

/**
 * A quoted verse with its reference and translation, always King James.
 * Every verse on the site goes through here, so check:content can confirm
 * each `data-verse` figure shows "(KJV)". The text comes from scripture.ts.
 */
export function Verse({
  id,
  className,
  quoteClassName,
  captionClassName,
}: {
  id: VerseRef;
  className?: string;
  quoteClassName?: string;
  captionClassName?: string;
}) {
  const verse = getVerse(id);
  return (
    <figure data-verse={id} className={className}>
      <blockquote className={quoteClassName}>“{verse.text}”</blockquote>
      <figcaption
        className={cn(
          "mt-2 text-[0.8em] tracking-wide opacity-75",
          captionClassName,
        )}
      >
        {verse.ref} ({verse.translation})
      </figcaption>
    </figure>
  );
}

/** Small gold caps over each part of the page. */
const LABEL =
  "mb-[1cqw] font-heading text-[2.1cqw] font-semibold tracking-[0.14em] text-highlight uppercase";
/** A part of the page under a hairline rule. */
const PART =
  "relative mb-[2cqw] border-t border-paper-foreground/20 pt-[1.6cqw]";

/**
 * One printed page of the guide. Sizes are in page widths (cqw), so the page
 * scales into any container: the product gallery, "Look inside", the feature
 * callouts and the homepage. Give it a width; the height is A5.
 */
export function SamplePage({
  page,
  className,
}: {
  page: Page;
  className?: string;
}) {
  const book = getBook(page.bookId);

  return (
    // The outer box is the size container: cqw on the page itself (padding,
    // base type size) must resolve against the page width, not a parent.
    <div
      data-sample-page={page.bookId}
      className={cn("@container w-full", className)}
    >
      <article
        aria-label={`Sample page: ${book.name}`}
        className="relative aspect-[5.51/8.27] w-full overflow-hidden bg-paper p-[6cqw] text-[2.35cqw] leading-[1.35] text-paper-foreground"
      >
        {/* The page's gold double frame. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[2.6cqw] border-[0.5cqw] border-double border-highlight/50"
        />

        <header className="relative mb-[2.4cqw] text-center">
          <p className="font-heading text-[2cqw] tracking-[0.16em] text-highlight uppercase">
            {page.label}
          </p>
          <h3 className="mt-[1cqw] font-heading text-[9.5cqw] leading-none text-primary">
            {book.name}
          </h3>
          <p className="mt-[0.8cqw] font-heading text-[3cqw] italic">
            {page.tagline}
          </p>
        </header>

        <dl className="relative mb-[2.2cqw] grid grid-cols-2 gap-x-[3cqw] gap-y-[1.2cqw]">
          {(
            [
              ["Written by", page.author],
              ["When", page.written],
              ["Written to", page.audience],
              ["Setting", page.setting],
            ] as const
          ).map(([term, detail]) => (
            <div key={term}>
              <dt className={LABEL}>{term}</dt>
              <dd className="text-[2.2cqw] leading-[1.3]">{detail}</dd>
            </div>
          ))}
        </dl>

        <section className={PART}>
          <h4 className={LABEL}>The outline</h4>
          <ol className="space-y-[0.6cqw]">
            {page.outline.map(([chapters, summary]) => (
              <li key={chapters} className="flex gap-[1.6cqw]">
                <span className="w-[11cqw] shrink-0 font-semibold tabular-nums">
                  {chapters}
                </span>
                <span>{summary}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={PART}>
          <h4 className={LABEL}>Key themes</h4>
          <ul className="grid grid-cols-2 gap-x-[3cqw] gap-y-[1cqw]">
            {page.themes.map(([theme, note]) => (
              <li key={theme}>
                <span className="font-semibold">{theme}: </span>
                {note}
              </li>
            ))}
          </ul>
        </section>

        <section className={PART}>
          <h4 className={LABEL}>Look for</h4>
          <ul className="list-disc space-y-[0.4cqw] ps-[3.5cqw]">
            {page.lookFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="relative mb-[2cqw] border-y border-primary/30 py-[1.6cqw] text-center font-heading text-[3.6cqw] leading-[1.3] text-primary italic">
          <span className="sr-only">The big idea: </span>
          {page.bigIdea}
        </p>

        <div className="relative mb-[2cqw] grid grid-cols-2 gap-[3cqw]">
          <div>
            <h4 className={LABEL}>One truth</h4>
            <p>{page.truth}</p>
          </div>
          <div>
            <h4 className={LABEL}>One step this week</h4>
            <p>{page.step}</p>
          </div>
        </div>

        <Verse
          id={page.keyVerse}
          className="relative text-[2.2cqw]"
          quoteClassName="italic"
          captionClassName="mt-[0.6cqw] text-[1em] font-semibold tracking-normal opacity-100"
        />
      </article>
    </div>
  );
}
