import { ChevronDownIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { SectionHeading } from "~/components/brand/SectionHeading";
import { ExpertQuote, PressQuotes } from "~/components/proof/Endorsements";
import { RatingSummary, Stars } from "~/components/proof/Rating";
import {
  ReviewByline,
  ReviewFooter,
  ReviewReply,
  ReviewTitle,
} from "~/components/proof/ReviewParts";
import { ReviewPhotos } from "~/components/proof/ReviewPhotos";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { brand } from "~/content/brand";
import { fillProof, proof } from "~/content/proof";
import {
  REVIEW_SORTS,
  productReviews,
  sortReviews,
  type ReviewSort,
} from "~/content/reviews";
import type { Review } from "~/content/types";

const PAGE = 12;
/** The topic chip that clears the topic filter. */
const ALL_TOPICS = "all";

/**
 * SOP section 5: the rating summary, customer photos, then a wall of reviews
 * shown up front (never a carousel) that filters by stars and theme, sorts,
 * and grows 12 at a time. Lamplight sets them as pull quotes: the lead review
 * large and centred between rules, the rest in a ruled three-column list.
 * Then the expert and press slots. Every number and review is a labelled
 * placeholder until real reviews exist.
 */
export function SocialProof() {
  const [stars, setStars] = useState<number | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [sort, setSort] = useState<ReviewSort>("relevant");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(
    () =>
      sortReviews(
        productReviews.filter(
          (r) =>
            (!stars || r.rating === stars) &&
            (!theme || r.tags.includes(theme)),
        ),
        sort,
      ),
    [stars, theme, sort],
  );
  const visible = filtered.slice(0, shown);
  const filtering = stars !== null || theme !== null;
  const reset = (fn: () => void) => {
    fn();
    setShown(PAGE);
  };

  return (
    <section
      id="reviews"
      data-sop-section="social-proof"
      aria-labelledby="reviews-heading"
      className="scroll-mt-4 bg-card py-16 text-card-foreground sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="reviews-heading"
          sub={fillProof(brand.pdp.reviewsSub)}
          align="center"
        >
          {brand.pdp.reviewsHeadline}
        </SectionHeading>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <RatingSummary
            selected={stars}
            onSelect={(s) => reset(() => setStars(s))}
          />
          <ReviewPhotos />
        </div>

        <Toolbar
          theme={theme}
          onTheme={(t) => reset(() => setTheme(t))}
          sort={sort}
          onSort={(s) => reset(() => setSort(s))}
        />

        <p
          aria-live="polite"
          className="mt-6 flex min-h-11 flex-wrap items-center gap-x-3 text-sm"
        >
          Showing {visible.length} of {filtered.length} reviews
          {stars !== null && ` · ${stars} star${stars > 1 ? "s" : ""}`}
          {theme && ` · ${proof.themes.find((t) => t.id === theme)?.label}`}
          {filtering ? (
            <Button
              variant="link"
              onClick={() =>
                reset(() => {
                  setStars(null);
                  setTheme(null);
                })
              }
              className="h-11 gap-1 px-1 font-semibold text-foreground underline underline-offset-4"
            >
              <XIcon aria-hidden className="size-3.5" />
              Clear filters
            </Button>
          ) : null}
        </p>

        <div className="mt-6 sm:mt-8">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-lg">
              No reviews match these filters yet.
            </p>
          ) : (
            <PullQuotes reviews={visible} />
          )}
        </div>

        {filtered.length > shown ? (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShown((n) => n + PAGE)}
              className="h-12 gap-2 rounded-sm border-foreground bg-transparent px-6 font-heading text-sm font-semibold tracking-[0.12em] text-highlight uppercase shadow-none hover:bg-foreground hover:text-background"
            >
              Show more reviews
              <ChevronDownIcon aria-hidden className="size-4" />
            </Button>
          </div>
        ) : null}

        <div className="mt-16 grid gap-10 sm:mt-24">
          <ExpertQuote />
          <PressQuotes />
        </div>
      </div>
    </section>
  );
}

function Toolbar({
  theme,
  onTheme,
  sort,
  onSort,
}: {
  theme: string | null;
  onTheme: (theme: string | null) => void;
  sort: ReviewSort;
  onSort: (sort: ReviewSort) => void;
}) {
  const counts = proof.themes.map((t) => ({
    ...t,
    count: productReviews.filter((r) => r.tags.includes(t.id)).length,
  }));
  // Thin outlined chips; the chosen topic fills with ink.
  const chip =
    "h-11 gap-1.5 rounded-sm border border-border px-3.5 text-sm font-medium hover:border-foreground hover:bg-transparent hover:text-foreground data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:hover:bg-foreground data-[state=on]:hover:text-background";

  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
      <ToggleGroup
        type="single"
        aria-label="Filter reviews by topic"
        value={theme ?? ALL_TOPICS}
        // Clicking the active topic again deselects it (""), which means all topics.
        onValueChange={(value) =>
          onTheme(value && value !== ALL_TOPICS ? value : null)
        }
        className="-mx-4 w-auto justify-start overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0"
      >
        <ToggleGroupItem value={ALL_TOPICS} className={chip}>
          All topics
        </ToggleGroupItem>
        {counts.map((t) => (
          <ToggleGroupItem key={t.id} value={t.id} className={chip}>
            {t.label}
            <span className="tabular-nums opacity-70">{t.count}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex shrink-0 items-center gap-2">
        <Label htmlFor="review-sort" className="font-normal">
          Sort by
        </Label>
        <Select value={sort} onValueChange={(v) => onSort(v as ReviewSort)}>
          <SelectTrigger
            id="review-sort"
            className="rounded-sm border-border px-3 font-semibold shadow-none data-[size=default]:h-11 [&>svg]:text-foreground"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REVIEW_SORTS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/**
 * Lamplight's pull quotes: the first review set large in italic between two
 * rules, then the rest in a three-column list under hairlines, each with a
 * small, slightly grey photo.
 */
function PullQuotes({ reviews }: { reviews: Review[] }) {
  const [lead, ...rest] = reviews;
  return (
    <div>
      <figure
        data-review-card
        className="mx-auto max-w-4xl border-y border-border py-12 text-center"
      >
        <Eyebrow className="mb-4 text-muted-foreground">{lead.title}</Eyebrow>
        <blockquote className="font-heading text-3xl leading-snug text-balance italic sm:text-5xl">
          “{lead.body}”
        </blockquote>
        <figcaption className="mt-6 flex flex-col items-center gap-2">
          <span className="text-primary">
            <Stars rating={lead.rating} className="size-4" />
          </span>
          <ReviewByline review={lead} />
          <ReviewReply review={lead} />
          <ReviewFooter
            review={lead}
            className="mx-auto max-w-sm text-center [&>div]:justify-center [&_button]:ms-0"
          />
        </figcaption>
      </figure>
      {rest.length ? (
        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((review) => (
            <li
              key={review.id}
              data-review-card
              className="flex gap-4 border-t border-border pt-6"
            >
              {review.photo ? (
                <Img
                  image={review.photo}
                  sizes="80px"
                  className="size-16 shrink-0 object-cover grayscale-[30%]"
                />
              ) : null}
              <figure className="min-w-0 flex-1">
                <span className="text-primary">
                  <Stars rating={review.rating} className="size-3.5" />
                </span>
                <ReviewTitle review={review} className="mt-2 text-lg" />
                <blockquote className="mt-2 font-heading text-lg leading-snug italic">
                  “{review.body}”
                </blockquote>
                <figcaption className="mt-4">
                  <ReviewByline review={review} />
                  <ReviewReply review={review} />
                  <ReviewFooter review={review} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
