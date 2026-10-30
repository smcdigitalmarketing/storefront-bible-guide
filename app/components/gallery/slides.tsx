// The seven SOP gallery slides plus the demo slot, in the required order.
// Photos never carry words: every headline, label and badge is HTML laid
// over the image, so it stays editable and sharp. Text is sized in container
// units so a slide reads the same on a 375 px phone and a desktop column.
// The guide itself is drawn in code (components/book), not photographed.

import {
  BookOpenIcon,
  CheckIcon,
  NotebookPenIcon,
  PenLineIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { BookCover, BOOK_STAGE } from "~/components/book/BookCover";
import { PageFlip } from "~/components/book/LookInside";
import { Verse } from "~/components/book/SamplePage";
import { DoubleRule } from "~/components/brand/DoubleRule";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { useOptionalSelection } from "~/components/pdp/selection";
import { Stars } from "~/components/proof/Rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { samplePages } from "~/content/books";
import { brand } from "~/content/brand";
import { LEAD_COLOUR, type ColourId } from "~/content/catalog";
import type { ImageId } from "~/content/images";
import { gifts } from "~/content/offers";
import { product } from "~/content/product";
import { ratingCount, ratingLabel } from "~/content/proof";
import { getReview } from "~/content/reviews";
import { useOffer } from "~/lib/offer";
import { cn } from "~/lib/utils";

export type Slide = {
  id: string;
  label: string;
  /** Thumbnail photo; slides drawn in code use `drawn` instead. */
  thumb?: ImageId;
  /** A small drawn thumbnail for slides without a photo. */
  drawn?: "book" | "compare" | "steps" | "versus";
  kind: "image" | "video";
  render: (priority: boolean) => ReactNode;
};

/** SOP gallery order. Do not reorder: the content check asserts it. */
export const slides: Slide[] = [
  {
    id: "benefit",
    label: "Benefit headline",
    drawn: "book",
    kind: "image",
    render: () => <BenefitSlide />,
  },
  {
    id: "in-use",
    label: "In use",
    thumb: "gallery-in-use",
    kind: "image",
    render: (priority) => <InUseSlide priority={priority} />,
  },
  {
    id: "comparison",
    label: "Without and with context",
    drawn: "compare",
    kind: "image",
    render: () => <ComparisonSlide />,
  },
  {
    id: "included",
    label: "What's included",
    drawn: "book",
    kind: "image",
    render: () => <IncludedSlide />,
  },
  {
    id: "how-it-works",
    label: "How it works",
    drawn: "steps",
    kind: "image",
    render: () => <HowItWorksSlide />,
  },
  {
    id: "versus",
    label: "Us vs alternatives",
    drawn: "versus",
    kind: "image",
    render: () => <VersusSlide />,
  },
  {
    id: "review",
    label: "Review",
    thumb: "interior-chronicles",
    kind: "image",
    render: () => <ReviewSlide />,
  },
  {
    id: "video",
    label: "Silent demo",
    drawn: "book",
    kind: "video",
    render: () => <DemoSlide />,
  },
];

const copy = brand.pdp.gallery;
const SIZES = "(min-width: 1024px) 50vw, 100vw";
/** A slide's main headline: a light serif, centred. */
const HEADLINE =
  "font-heading text-[7.4cqw] leading-[1.1] font-normal text-balance";
/** The headline over a band or panel slide. */
const BAND_HEADLINE =
  "font-heading text-[5.6cqw] leading-tight font-normal text-balance text-center";
/** The small numbered ring used on the included and how-it-works slides. */
const NUMBER =
  "flex shrink-0 items-center justify-center rounded-full border border-primary font-heading font-semibold text-primary";

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

/** The cover picked in the buy box, or the lead cover elsewhere. */
export function usePreviewColour(): ColourId {
  return useOptionalSelection()?.previewColour ?? LEAD_COLOUR;
}

function BenefitSlide() {
  const colour = usePreviewColour();
  return (
    <Frame className={BOOK_STAGE}>
      <div className="absolute inset-x-0 top-0 space-y-[2.4cqw] p-[6cqw] text-center">
        <Eyebrow className="text-[2.6cqw]">{copy.benefit.eyebrow}</Eyebrow>
        <h3 className={HEADLINE}>{copy.benefit.headline}</h3>
        <p className="text-muted-foreground text-[3.6cqw]">
          {copy.benefit.sub}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-[7cqw] flex justify-center">
        <BookCover colour={colour} sway className="w-[34cqw]" />
      </div>
    </Frame>
  );
}

function InUseSlide({ priority }: { priority: boolean }) {
  return (
    <Frame>
      <Img
        image="gallery-in-use"
        sizes={SIZES}
        priority={priority}
        className="size-full object-cover"
      />
      <div className="from-foreground/75 via-foreground/30 absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent" />
      <div className="text-background absolute inset-x-0 bottom-0 space-y-[2cqw] p-[6cqw] text-center text-shadow-md">
        <h3 className={cn(HEADLINE, "font-medium")}>{copy.inUse.headline}</h3>
        <p className="text-[3.8cqw]">{copy.inUse.sub}</p>
      </div>
      {/* Stand-in photos stay labelled until our own replace them. */}
      <PlaceholderTag
        kind="competitor"
        label="Competitor photo: their cover, not ours"
        className="bg-foreground/50 text-background absolute top-[4cqw] left-[4cqw] text-[2.2cqw]"
      />
    </Frame>
  );
}

/** The same verse, read cold and then with the sample page's background. */
function ComparisonSlide() {
  const john = samplePages.find((page) => page.bookId === "john");
  // Three notes from the John sample page, in the page's own words.
  const notes = john
    ? [
        { title: "Setting", body: john.setting },
        { title: "Look for", body: john.lookFor[0] },
        { title: "The big idea", body: john.bigIdea },
      ]
    : [];
  const panel =
    "flex flex-col items-center gap-[2.4cqw] rounded-sm border p-[3.6cqw] text-center text-[2.9cqw] leading-snug";
  const tag =
    "rounded-sm px-[1.8cqw] py-[0.8cqw] text-[2.4cqw] leading-none font-semibold";

  return (
    <Frame className="bg-card text-card-foreground flex flex-col p-[6cqw]">
      <h3 className={BAND_HEADLINE}>{copy.comparison.headline}</h3>
      <div className="mt-[4cqw] grid min-h-0 flex-1 grid-cols-2 gap-[3cqw]">
        <div className={cn(panel, "bg-background")}>
          <span className={cn(tag, "bg-foreground/10")}>
            {copy.comparison.left}
          </span>
          <Verse
            id="john-2-6"
            className="my-auto"
            quoteClassName="font-heading text-[3.6cqw] leading-snug italic"
            captionClassName="text-muted-foreground text-[2.4cqw] opacity-100"
          />
        </div>
        <div className={cn(panel, "bg-secondary text-secondary-foreground")}>
          <span className={cn(tag, "bg-primary text-primary-foreground")}>
            {copy.comparison.right}
          </span>
          <ul className="my-auto space-y-[2.4cqw]">
            {notes.map((note) => (
              <li key={note.title}>
                <Eyebrow asChild>
                  <span className="block text-[2.3cqw]">{note.title}</span>
                </Eyebrow>
                {note.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-muted-foreground mt-[3cqw] text-center text-[2.4cqw]">
        {copy.comparison.note}
      </p>
      <PlaceholderTag
        kind="placeholder"
        label="Sample page, to be reviewed before print"
        className="mx-auto mt-[1.6cqw] text-[2.2cqw]"
      />
    </Frame>
  );
}

/** The digital gifts that come with the smallest bundle that has any. */
function useGiftLine() {
  const { offer } = useOffer();
  const bundle = offer.bundles.find((b) => b.gifts.length > 0);
  if (!bundle) return null;
  const title = brand.bundleNames[bundle.id].title.toLowerCase();
  const names = bundle.gifts.map((id) => gifts[id].name);
  return `Complimentary with ${title}: ${names.join(", ")}.`;
}

function IncludedSlide() {
  const colour = usePreviewColour();
  const giftLine = useGiftLine();
  return (
    <Frame className="bg-card text-card-foreground grid grid-cols-[40%_1fr] items-center gap-[4cqw] p-[6cqw]">
      <div
        className={cn(
          BOOK_STAGE,
          "flex h-full items-center justify-center rounded-sm",
        )}
      >
        <BookCover colour={colour} className="w-[26cqw]" />
      </div>
      <div className="space-y-[3cqw] text-center">
        <h3 className={BAND_HEADLINE}>{copy.included.headline}</h3>
        <DoubleRule className="mx-auto w-[12cqw]" />
        <ul className="space-y-[2.4cqw] text-[3cqw] leading-tight">
          {product.included.map((item, i) => (
            <li key={item.name} className="flex flex-col items-center">
              <span
                className={cn(NUMBER, "mb-[1cqw] size-[4.6cqw] text-[2.4cqw]")}
              >
                {i + 1}
              </span>
              <span className="font-semibold">{item.name}</span>
              <span className="text-muted-foreground text-[2.5cqw]">
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
        {giftLine && (
          <p className="text-muted-foreground text-[2.5cqw]">{giftLine}</p>
        )}
      </div>
    </Frame>
  );
}

const STEP_ICONS = [BookOpenIcon, NotebookPenIcon, PenLineIcon, CheckIcon];

function HowItWorksSlide() {
  return (
    <Frame className="bg-background flex flex-col p-[6cqw]">
      <h3 className={cn(BAND_HEADLINE, "mb-[5cqw]")}>
        {copy.howItWorks.headline}
      </h3>
      <ol className="grid min-h-0 flex-1 grid-cols-2 gap-[3cqw]">
        {product.howItWorks.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          return (
            <li
              key={step.title}
              className="bg-card text-card-foreground flex flex-col items-center justify-center gap-[2cqw] rounded-sm border p-[3.6cqw] text-center"
            >
              <span className="flex items-center gap-[2cqw]">
                <span className={cn(NUMBER, "size-[7cqw] text-[3.6cqw]")}>
                  {i + 1}
                </span>
                <Icon
                  aria-hidden
                  className="text-highlight size-[5cqw] stroke-[1.25]"
                />
              </span>
              <span className="font-heading text-[4cqw] leading-tight font-semibold">
                {step.title}
              </span>
              <span className="text-muted-foreground text-[2.8cqw] leading-snug">
                {step.body}
              </span>
            </li>
          );
        })}
      </ol>
    </Frame>
  );
}

function VersusSlide() {
  const { columns, rows } = product.comparison;
  // Our own column carries the brand name; the rest are as in the content.
  const heads = [brand.name, ...columns.slice(1)];
  return (
    <Frame className="bg-foreground text-background">
      <div className="relative flex size-full flex-col justify-center p-[5cqw]">
        <h3 className={cn(BAND_HEADLINE, "mb-[2.4cqw]")}>
          {copy.versus.headline}
        </h3>
        <Table className="table-fixed border-collapse text-[2.5cqw]">
          <TableHeader>
            <TableRow className="border-background/20 hover:bg-transparent">
              {heads.map((head, i) => (
                <TableHead
                  key={head}
                  scope="col"
                  className={cn(
                    "text-background h-auto px-[1cqw] pb-[1.6cqw] text-center leading-tight font-semibold whitespace-normal",
                    i === 0 && "font-heading text-foil text-[3.4cqw]",
                  )}
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {rows.map((row) => (
            <TableBody key={row.label}>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead
                  scope="colgroup"
                  colSpan={heads.length}
                  className="text-background/70 h-auto px-0 pt-[1.6cqw] pb-[0.6cqw] text-center text-[2.2cqw] font-medium tracking-[0.12em] whitespace-normal uppercase"
                >
                  {row.label}
                </TableHead>
              </TableRow>
              <TableRow className="border-background/20 border-b hover:bg-transparent">
                {row.values.map((value, i) => (
                  <TableCell
                    key={i}
                    className={cn(
                      "px-[1cqw] pt-0 pb-[1.6cqw] text-center align-top leading-tight whitespace-normal",
                      i === 0 ? "text-foil font-semibold" : "opacity-85",
                    )}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ))}
        </Table>
        <p className="mt-[1.6cqw] text-center text-[2.2cqw] opacity-70">
          Criteria chosen by us.
        </p>
      </div>
    </Frame>
  );
}

function ReviewSlide() {
  const review = getReview(copy.review.reviewId);
  return (
    <Frame className="bg-secondary text-secondary-foreground flex flex-col p-[6cqw]">
      <h3 className={BAND_HEADLINE}>{copy.review.headline}</h3>
      <figure className="bg-card text-card-foreground mt-[5cqw] flex flex-1 flex-col items-center justify-center gap-[3cqw] rounded-sm p-[5cqw] text-center">
        {review.photo && (
          <Img
            image={review.photo}
            sizes="30vw"
            className="size-[18cqw] shrink-0 rounded-sm object-cover"
          />
        )}
        <span className="text-highlight">
          <Stars rating={review.rating} className="size-[4cqw]" />
        </span>
        <blockquote className="font-heading text-[5cqw] leading-snug italic">
          “{review.body}”
        </blockquote>
        <DoubleRule className="w-[12cqw]" />
        <div className="flex flex-col items-center gap-[1.5cqw]">
          <p className="font-heading text-[3.6cqw] font-semibold">
            {review.name}
          </p>
          <PlaceholderTag
            kind="review-placeholder"
            className="text-[2.2cqw] leading-none"
          />
        </div>
        <figcaption className="text-muted-foreground text-[2.4cqw]">
          Rated {ratingLabel} out of 5 from {ratingCount} reviews (illustrative)
          · {review.source}
        </figcaption>
      </figure>
    </Frame>
  );
}

/** The demo slot: sample pages turning, silent. Not a video file. */
function DemoSlide() {
  return (
    <Frame className={cn(BOOK_STAGE, "flex items-center justify-center")}>
      <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-[1.6cqw] p-[5cqw] text-center">
        <Eyebrow className="text-[2.6cqw]">
          {brand.store.home.inside.eyebrow} · silent
        </Eyebrow>
        <PlaceholderTag
          kind="placeholder"
          label="Drawn sample pages: replace with a flip-through video of the printed guide"
          className="text-[2.2cqw]"
        />
      </div>
      <PageFlip className="mt-[12cqw] w-[46cqw]" />
    </Frame>
  );
}

/** Small drawn thumbnails for the slides without a photo. */
export function DrawnThumb({
  kind,
  colour,
}: {
  kind: NonNullable<Slide["drawn"]>;
  colour: ColourId;
}) {
  if (kind === "book")
    return (
      <span
        className={cn(BOOK_STAGE, "flex size-full items-center justify-center")}
      >
        <BookCover view="front" colour={colour} label="" className="w-[42%]" />
      </span>
    );
  const Icon = {
    compare: BookOpenIcon,
    steps: NotebookPenIcon,
    versus: CheckIcon,
  }[kind];
  return (
    <span
      className={cn(
        "flex size-full items-center justify-center",
        kind === "versus"
          ? "bg-foreground text-background"
          : "bg-card text-primary",
      )}
    >
      <Icon aria-hidden className="size-6 stroke-[1.25]" />
    </span>
  );
}
