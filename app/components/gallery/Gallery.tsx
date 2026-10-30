import { BookOpenIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { LookInsideDialog } from "~/components/book/LookInside";
import { Img } from "~/components/brand/Img";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import { brand } from "~/content/brand";
import { getReview } from "~/content/reviews";
import { useReducedMotion } from "~/lib/motion";
import { cn } from "~/lib/utils";

import { DrawnThumb, slides, usePreviewColour, type Slide } from "./slides";

const reviewPhoto = getReview(brand.pdp.gallery.review.reviewId).photo;
const thumbFor = (slide: Slide) =>
  slide.id === "review" ? (reviewPhoto ?? slide.thumb) : slide.thumb;

/** The 8-slide SOP gallery. */
export function Gallery({ className }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [insideOpen, setInsideOpen] = useState(false);
  const reduced = useReducedMotion();
  const colour = usePreviewColour();

  // Keep the active index in sync with arrows, keys, thumbnails and swipes.
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className={cn("min-w-0", className)}>
      <Carousel
        setApi={setApi}
        // Reduced motion: arrows, keys and thumbnails jump instead of sliding.
        opts={{ loop: true, duration: reduced ? 0 : 25 }}
        aria-label={`${brand.productName} images`}
      >
        {/* Focusable, so the left and right arrow keys change slides. */}
        <div
          tabIndex={0}
          className="focus-visible:outline-ring isolate overflow-hidden rounded-lg focus-visible:outline-3 focus-visible:-outline-offset-3"
        >
          <CarouselContent className="ml-0" aria-live="polite">
            {slides.map((slide, i) => (
              <CarouselItem
                key={slide.id}
                aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
                aria-hidden={i !== index}
                inert={i !== index}
                data-slide={slide.id}
                className="pl-0"
              >
                <div className="aspect-square w-full">
                  {slide.render(i === 0)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        {/* Controls sit under the image, clear of every slide's text. */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <Button
            variant="link"
            onClick={() => setInsideOpen(true)}
            className="text-muted-foreground hover:text-foreground font-heading h-11 gap-1.5 px-0 text-xs font-semibold tracking-[0.12em] uppercase"
          >
            <BookOpenIcon aria-hidden className="stroke-[1.5]" />
            Look inside
          </Button>
          <div className="flex gap-2">
            <CarouselPrevious
              aria-label="Previous image"
              size="icon-lg"
              className="static size-11 shadow-none"
            />
            <CarouselNext
              aria-label="Next image"
              size="icon-lg"
              className="static size-11 shadow-none"
            />
          </div>
        </div>

        <ol
          aria-label="Choose image"
          className="mt-2 flex gap-2 overflow-x-auto p-1 [scrollbar-width:none]"
        >
          {slides.map((slide, i) => {
            const thumb = thumbFor(slide);
            return (
              <li key={slide.id} className="shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Show image ${i + 1}: ${slide.label}`}
                  aria-current={i === index}
                  className={cn(
                    "relative size-14 overflow-hidden rounded-sm border p-0 sm:size-16",
                    i === index
                      ? "border-foreground"
                      : "border-border opacity-70 hover:opacity-100",
                  )}
                >
                  {slide.drawn ? (
                    <DrawnThumb kind={slide.drawn} colour={colour} />
                  ) : thumb ? (
                    <Img
                      image={thumb}
                      sizes="64px"
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : null}
                  {slide.kind === "video" && (
                    <span className="bg-foreground/40 text-background absolute inset-0 flex items-center justify-center">
                      <PlayIcon className="size-4" fill="currentColor" />
                    </span>
                  )}
                </Button>
              </li>
            );
          })}
        </ol>
      </Carousel>
      {/* Outside the carousel, so its arrow-key handler doesn't reach the
          dialog through the portal. */}
      <LookInsideDialog open={insideOpen} onOpenChange={setInsideOpen} />
    </div>
  );
}
