import {
  ClockIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "lucide-react";

import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Stars } from "~/components/proof/Rating";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { brand } from "~/content/brand";
import { product } from "~/content/product";
import { getReview } from "~/content/reviews";

import { useSelection } from "../selection";

/**
 * SOP section 3: shipping, returns, guarantee, one urgency line and one short
 * review. No payment badges. Nothing here is invented: unconfirmed policies
 * say so, and urgency only appears on the Black Friday presentation, without
 * a deadline, because none has been set.
 */
export function UnderButton() {
  const { offerId } = useSelection();
  const { shipping, returns, guarantee } = product.policies;

  const rows = [
    { icon: TruckIcon, ...shipping },
    { icon: RotateCcwIcon, ...returns },
    { icon: ShieldCheckIcon, ...guarantee },
  ];

  return (
    <section
      data-sop-section="under-the-button"
      aria-label="Delivery, returns and a review"
      className="space-y-4"
    >
      {offerId === "early-black-friday" && (
        <p className="border-primary text-primary flex items-center gap-2 border-l-2 ps-3 text-sm font-medium">
          <ClockIcon aria-hidden className="size-4 shrink-0 stroke-[1.25]" />
          <span>Early Black Friday pricing. End date not set yet.</span>
          <PlaceholderTag kind="tbc" className="ms-auto shrink-0" />
        </p>
      )}

      {/* Rows between two thin rules. */}
      <ItemGroup className="gap-0 border-y">
        {rows.map((row) => (
          <Item
            key={row.title}
            role="listitem"
            size="sm"
            className="not-last:border-b flex-nowrap items-start gap-3 rounded-none border-0 py-3"
          >
            <ItemMedia variant="icon" className="text-primary">
              <row.icon aria-hidden className="size-5 stroke-[1.25]" />
            </ItemMedia>
            <ItemContent className="min-w-0">
              {/* The label sits by the title so the body keeps the full width on phones. */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <ItemTitle className="font-semibold">{row.title}</ItemTitle>
                <PlaceholderTag kind="tbc" />
              </div>
              <ItemDescription className="line-clamp-none">
                {row.body}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
      <ShortReview />
    </section>
  );
}

/** One short placeholder review, shown under the button. */
function ShortReview() {
  const review = getReview(brand.pdp.underButtonReview);

  return (
    <figure className="bg-card text-card-foreground rounded-sm p-4 text-sm">
      <div className="min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-highlight">
            <Stars rating={review.rating} className="size-3.5" />
          </span>
          <span className="font-heading text-base font-semibold">
            {review.name}
          </span>
          <PlaceholderTag kind="review-placeholder" />
        </div>
        <p className="font-semibold">{review.title}</p>
        <blockquote className="font-heading text-lg leading-snug italic">
          “{review.body}”
        </blockquote>
        <figcaption className="text-muted-foreground text-xs">
          {review.source}
        </figcaption>
      </div>
    </figure>
  );
}
