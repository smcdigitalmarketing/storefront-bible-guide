import { Img } from "~/components/brand/Img";
import type { Review } from "~/content/types";
import { cn } from "~/lib/utils";

import { Stars } from "./Rating";
import {
  ReviewByline,
  ReviewFooter,
  ReviewReply,
  ReviewTitle,
} from "./ReviewParts";

/**
 * A full review in Lamplight's style: an ink rule over the review, the words
 * in the serif. It has no ground of its own, so it reads on Parchment or the
 * card surface.
 */
export function ReviewCard({
  review,
  photo = true,
  className,
}: {
  review: Review;
  /** Its place in a list. Lamplight sets every review the same way. */
  index?: number;
  photo?: boolean;
  className?: string;
}) {
  return (
    <article
      data-review-card
      className={cn(
        "flex flex-col gap-3 border-t border-foreground pt-6 text-base",
        className,
      )}
    >
      {photo && review.photo ? (
        <Img
          image={review.photo}
          sizes="(min-width: 768px) 30vw, 100vw"
          className="aspect-[3/2] w-full object-cover"
        />
      ) : null}
      <span className="text-primary">
        <Stars rating={review.rating} className="size-4" />
      </span>
      <ReviewTitle review={review} />
      <p className="flex-1 font-heading text-lg leading-snug">
        “{review.body}”
      </p>
      <ReviewByline review={review} />
      <ReviewReply review={review} />
      <ReviewFooter review={review} className="mt-1" />
    </article>
  );
}
