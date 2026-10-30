// The seven SOP gallery slides plus the video slot, in the required order.
// Photos never carry words: every headline, label and badge is HTML laid
// over the image, so it stays editable and sharp. Text is sized in container
// units so a slide reads the same on a 375 px phone and a desktop column.

import { CheckIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Stars } from "~/components/proof/Rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { brand } from "~/content/brand";
import { images, type ImageId } from "~/content/images";
import { product } from "~/content/product";
import { ratingCount, ratingLabel } from "~/content/proof";
import { getReview } from "~/content/reviews";
import { cn } from "~/lib/utils";

export type Slide = {
  id: string;
  label: string;
  thumb: ImageId;
  kind: "image" | "video";
  render: (priority: boolean) => ReactNode;
};

/** SOP gallery order. Do not reorder: the content check asserts it. */
export const slides: Slide[] = [
  {
    id: "benefit",
    label: "Benefit headline",
    thumb: "flatlay-coffee",
    kind: "image",
    render: (priority) => <BenefitSlide priority={priority} />,
  },
  {
    id: "in-use",
    label: "In use",
    thumb: "gallery-in-use",
    kind: "image",
    render: () => <InUseSlide />,
  },
  {
    id: "comparison",
    label: "Without and with context",
    thumb: "interior-exodus",
    kind: "image",
    render: () => <ComparisonSlide />,
  },
  {
    id: "included",
    label: "What's included",
    thumb: "product-angle",
    kind: "image",
    render: () => <IncludedSlide />,
  },
  {
    id: "how-it-works",
    label: "How it works",
    thumb: "interior-chronicles",
    kind: "image",
    render: () => <HowItWorksSlide />,
  },
  {
    id: "versus",
    label: "Us vs alternatives",
    thumb: "product-front",
    kind: "image",
    render: () => <VersusSlide />,
  },
  {
    id: "review",
    label: "Review",
    thumb: "customer-hand",
    kind: "image",
    render: () => <ReviewSlide />,
  },
  {
    id: "video",
    label: "Silent demo",
    thumb: "product-front",
    kind: "video",
    render: () => <VideoSlide />,
  },
];

const copy = brand.pdp.gallery;
const SIZES = "(min-width: 1024px) 50vw, 100vw";
const HEADLINE =
  "font-heading text-[8.4cqw] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance";
const BAND_HEADLINE =
  "font-heading text-[6.4cqw] leading-none font-extrabold tracking-[-0.02em] text-balance";

function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // The container is the outer box, so cqw units on the inner box (padding,
  // gaps) resolve against the slide rather than the viewport.
  return (
    <div className="@container size-full">
      <div className={cn("relative size-full overflow-hidden", className)}>
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-block -rotate-2 rounded-full bg-secondary px-[2.4cqw] py-[1.2cqw] font-heading text-[3.2cqw] leading-none font-bold text-secondary-foreground">
      {children}
    </p>
  );
}

function BenefitSlide({ priority }: { priority: boolean }) {
  return (
    <Frame>
      <Img
        image="flatlay-coffee"
        sizes={SIZES}
        priority={priority}
        className="size-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-3/5 bg-linear-to-b from-foreground/70 via-foreground/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 space-y-[2.6cqw] p-[6cqw] text-background text-shadow-md">
        <Eyebrow>{copy.benefit.eyebrow}</Eyebrow>
        <h3 className={HEADLINE}>{copy.benefit.headline}</h3>
        <p className="text-[3.8cqw] font-medium">{copy.benefit.sub}</p>
      </div>
    </Frame>
  );
}

function InUseSlide() {
  return (
    <Frame>
      <Img
        image="gallery-in-use"
        sizes={SIZES}
        className="size-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-foreground/75 via-foreground/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-[2cqw] p-[6cqw] text-background text-shadow-md">
        <h3 className={HEADLINE}>{copy.inUse.headline}</h3>
        <p className="text-[3.8cqw]">{copy.inUse.sub}</p>
      </div>
    </Frame>
  );
}

function ComparisonSlide() {
  const panels: { image: ImageId; label: string; tilt: string }[] = [
    {
      image: "open-pages",
      label: copy.comparison.left,
      tilt: "-rotate-3",
    },
    {
      image: "interior-exodus",
      label: copy.comparison.right,
      tilt: "rotate-2",
    },
  ];
  return (
    <Frame className="flex flex-col bg-card p-[6cqw] text-card-foreground">
      <h3 className={BAND_HEADLINE}>{copy.comparison.headline}</h3>
      <div className="mt-[5cqw] grid flex-1 grid-cols-2 items-center gap-[4cqw]">
        {panels.map((panel) => (
          <figure
            key={panel.image}
            className={cn("bg-card p-2 pb-7 shadow-xl", panel.tilt)}
          >
            <Img
              image={panel.image}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-[4/5] max-h-[48cqw] w-full object-cover"
            />
            <figcaption className="mt-[1.6cqw] text-center font-heading text-[3.2cqw] font-bold">
              {panel.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-[3cqw] text-center text-[2.4cqw] text-muted-foreground">
        {copy.comparison.note}
      </p>
      {/* Stand-in photos stay labelled until our own replace them. */}
      {panels.some(
        (panel) => images[panel.image].status === "competitor-original",
      ) ? (
        <PlaceholderTag kind="competitor" className="mx-auto mt-[1.6cqw]" />
      ) : null}
    </Frame>
  );
}

function IncludedSlide() {
  return (
    <Frame className="flex flex-col bg-card text-card-foreground">
      <div className="space-y-[3cqw] px-[6cqw] pt-[6cqw] pb-[3cqw]">
        <h3 className={BAND_HEADLINE}>{copy.included.headline}</h3>
        <ul className="flex flex-wrap gap-[2cqw]">
          {product.included.map((item) => (
            <li
              key={item.name}
              className="rounded-full bg-background px-[2.6cqw] py-[1.4cqw] text-[3cqw] leading-tight font-semibold text-foreground"
            >
              {item.name}
              {item.detail.includes("TBC") && (
                <span className="text-muted-foreground"> · size TBC</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-0 flex-1">
        <Img
          image="product-angle"
          sizes={SIZES}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </Frame>
  );
}

function HowItWorksSlide() {
  return (
    <Frame className="flex flex-col bg-background p-[5cqw]">
      <h3 className={cn(BAND_HEADLINE, "mb-[4cqw]")}>
        {copy.howItWorks.headline}
      </h3>
      <ol className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[3cqw]">
        {product.howItWorks.map((step, i) => (
          <li
            key={step.title}
            className="relative min-h-0 overflow-hidden rounded-[3cqw]"
          >
            <Img
              image={step.image}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-[2cqw] bg-linear-to-t from-foreground/75 to-transparent p-[2.6cqw] pt-[6cqw] text-background">
              <span className="flex size-[6.4cqw] shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-[3.4cqw] font-bold text-secondary-foreground">
                {i + 1}
              </span>
              <span className="text-[3.3cqw] leading-tight font-semibold">
                {step.title}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

const VERSUS_ROWS: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "No screen while you shoot", values: [true, true, false] },
  { label: "Reusable", values: [true, false, true] },
  { label: "Nothing to develop", values: [true, false, true] },
  { label: "No notifications", values: [true, true, false] },
];

function VersusSlide() {
  const columns = [brand.name, "Disposable", "Phone"];
  return (
    <Frame className="bg-foreground text-background">
      <Img
        image="product-front"
        sizes={SIZES}
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="relative flex size-full flex-col p-[6cqw]">
        <h3 className={BAND_HEADLINE}>{copy.versus.headline}</h3>
        <div className="mt-auto">
          <Table className="border-collapse text-[3.1cqw]">
            <TableHeader>
              <TableRow className="border-background/20 hover:bg-transparent">
                <TableHead className="h-auto w-[40%]" />
                {columns.map((col, i) => (
                  <TableHead
                    key={col}
                    scope="col"
                    className={cn(
                      "h-auto px-[1cqw] pb-[2cqw] text-center font-semibold whitespace-normal text-background",
                      i === 0 &&
                        "rounded-t-[2cqw] bg-primary pt-[2cqw] text-primary-foreground",
                    )}
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {VERSUS_ROWS.map((row) => (
                <TableRow
                  key={row.label}
                  className="border-background/20 hover:bg-transparent"
                >
                  <TableHead
                    scope="row"
                    className="h-auto py-[2.4cqw] ps-0 pe-[1cqw] text-start font-medium whitespace-normal text-background"
                  >
                    {row.label}
                  </TableHead>
                  {row.values.map((ok, i) => (
                    <TableCell
                      key={i}
                      className={cn(
                        "p-0 text-center",
                        i === 0 && "bg-primary/90 text-primary-foreground",
                      )}
                    >
                      {ok ? (
                        <CheckIcon
                          role="img"
                          aria-label="Yes"
                          className="mx-auto size-[4.4cqw]"
                          strokeWidth={3}
                        />
                      ) : (
                        <XIcon
                          role="img"
                          aria-label="No"
                          className="mx-auto size-[4cqw] opacity-50"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Frame>
  );
}

function ReviewSlide() {
  const review = getReview(copy.review.reviewId);
  return (
    <Frame className="flex flex-col bg-accent p-[6cqw] text-accent-foreground">
      <h3 className={BAND_HEADLINE}>{copy.review.headline}</h3>
      <figure className="mt-[5cqw] flex flex-1 -rotate-1 flex-col gap-[3cqw] rounded-[4cqw] bg-card p-[5cqw] text-card-foreground shadow-lg">
        <div className="flex items-center gap-[3cqw]">
          {review.photo && (
            <Img
              image={review.photo}
              sizes="30vw"
              className="size-[20cqw] shrink-0 rounded-[2.5cqw] object-cover"
            />
          )}
          <div className="min-w-0 space-y-[1.5cqw]">
            <Stars rating={review.rating} className="size-[4cqw]" />
            <p className="text-[3.4cqw] font-semibold">{review.name}</p>
            <PlaceholderTag
              kind="review-placeholder"
              className="text-[2.2cqw] leading-none"
            />
          </div>
        </div>
        <blockquote className="text-[4.4cqw] leading-snug font-medium">
          “{review.body}”
        </blockquote>
        <figcaption className="mt-auto text-[2.4cqw] text-muted-foreground">
          Rated {ratingLabel} out of 5 from {ratingCount} reviews (illustrative)
          · {review.source}
        </figcaption>
      </figure>
    </Frame>
  );
}

function VideoSlide() {
  return (
    <Frame className="bg-card">
      {/* The silent turntable loop in the colour picked in the buy box. The
          pause control sits top right, clear of the gallery's own controls. */}
      <Img
        image="product-front"
        sizes={SIZES}
        className="size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-start gap-[1.6cqw] p-[5cqw]">
        <Eyebrow>360° turntable · silent</Eyebrow>
        <PlaceholderTag
          kind="placeholder"
          label="AI-generated turntable: replace with footage of our unit"
          className="text-[2.2cqw]"
        />
      </div>
    </Frame>
  );
}
