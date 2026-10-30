import { useRef, useState, type CSSProperties } from "react";

import { bookCounts } from "~/content/books";
import { brand } from "~/content/brand";
import { getColour, type ColourId } from "~/content/catalog";
import { cn } from "~/lib/utils";

// The guide is drawn in code, not photographed: a 3D book in Lamplight's
// cover design and the chosen leather. The design is a proposal until a
// supplier proof exists.
//
// Sizes are in cover widths: the scene is an inline-size container, so
// 1cqw is 1% of the cover's width. The book is 11cqw thick.

/** The studio backdrop behind the book (gallery, colour step, home, cards). */
export const BOOK_STAGE = "bg-radial-[circle_at_50%_35%] from-paper to-stage";

/** Every face of the book is a positioned plane seen from one side only. */
const FACE = "absolute backface-hidden";
/** The front and back boards. */
const BOARD =
  "inset-0 overflow-hidden rounded-[1.2cqw_2.6cqw_2.6cqw_1.2cqw] bg-linear-to-r from-(--leather-dark) from-2% to-(--leather-light) to-8%";
/** Gold foil pressed into the leather. */
const FOIL = "text-foil text-shadow-[0_-0.18cqw_0] text-shadow-foreground/45";

/** Page edges: one line every 0.5cqw. */
const PAGES = "bg-paper from-paper from-70% to-highlight/30 to-70%";

/**
 * The leather over a board or the spine: the far edge darkening, a soft
 * sheen and a grain of multiplied noise.
 */
function Leather({ ring = false }: { ring?: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 left-[72%] bg-linear-to-r to-(--leather-dark)"
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-[inherit] bg-radial-[120%_80%_at_30%_15%] from-paper/16 to-transparent to-60%",
          ring && "inset-ring-[0.3cqw] inset-ring-foreground/20",
        )}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27160%27%20height=%27160%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%271.1%27%20numOctaves=%273%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.55%200%27/%3E%3C/filter%3E%3Crect%20width=%27160%27%20height=%27160%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E)] mix-blend-multiply"
      />
    </>
  );
}

/**
 * The guide as a 3D book. Give it a width (`className="w-full"`, `w-[36cqw]`);
 * the height follows the A5 proportions.
 *
 * - `view="front"` draws the flat cover: thumbnails, cover fans, the sticky bar.
 * - `interactive`: a slider. Drag it, or use the arrow keys, to turn it 15° a press.
 * - `sway`: it turns gently on its own until someone touches it. Still under
 *   reduced motion.
 * - `label` names it for screen readers; `label=""` hides a decorative copy.
 */
export function BookCover({
  colour,
  view = "3d",
  interactive = false,
  sway = false,
  label,
  className,
}: {
  colour: ColourId;
  view?: "3d" | "front";
  interactive?: boolean;
  sway?: boolean;
  label?: string;
  className?: string;
}) {
  const [angle, setAngle] = useState(-26);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; angle: number } | null>(null);
  const [light, dark] = getColour(colour).leather;
  const flat = view === "front";
  const decorative = label === "";
  const slider = interactive && !flat;

  const turn = (next: number) => {
    setTouched(true);
    setAngle(Math.max(-180, Math.min(180, next)));
  };

  // Data, not styling: the chosen leather and the current angle.
  const vars = {
    "--leather-light": light,
    "--leather-dark": dark,
    "--angle": `${angle}deg`,
  } as CSSProperties;

  return (
    <div
      data-book-cover={colour}
      data-book-angle={flat ? undefined : Math.round(angle)}
      role={decorative ? undefined : slider ? "slider" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative
          ? undefined
          : (label ??
            `${brand.productName}, ${brand.store.colourNames[colour]} cover${slider ? ": drag or use the arrow keys to turn it" : ""}`)
      }
      aria-valuemin={slider ? -180 : undefined}
      aria-valuemax={slider ? 180 : undefined}
      aria-valuenow={slider ? Math.round(angle) : undefined}
      aria-valuetext={slider ? `${Math.round(angle)}°` : undefined}
      tabIndex={slider ? 0 : undefined}
      onKeyDown={
        slider
          ? (e) => {
              if (e.key === "ArrowLeft") turn(angle - 15);
              else if (e.key === "ArrowRight") turn(angle + 15);
              else return;
              e.preventDefault();
            }
          : undefined
      }
      onPointerDown={
        slider
          ? (e) => {
              setTouched(true);
              drag.current = { x: e.clientX, angle };
              // Capture can fail (synthetic or already-released pointers);
              // dragging still works without it.
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {}
            }
          : undefined
      }
      onPointerMove={
        slider
          ? (e) => {
              if (!drag.current) return;
              turn(drag.current.angle + (e.clientX - drag.current.x) * 0.6);
            }
          : undefined
      }
      onPointerUp={slider ? () => (drag.current = null) : undefined}
      onPointerCancel={slider ? () => (drag.current = null) : undefined}
      className={cn(
        "@container relative aspect-[5.51/8.27] select-none perspective-[1600px]",
        slider &&
          "cursor-grab touch-pan-y rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing",
        className,
      )}
      style={vars}
    >
      {/* The shadow the book casts on the table. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4%] -bottom-[7%] left-[8%] h-[9%] bg-radial-[closest-side] from-foreground/30 to-transparent blur-[3px]"
      />
      <div
        className={cn(
          "absolute inset-0",
          !flat &&
            "rotate-x-6 rotate-y-(--angle) transform-3d motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          !flat && sway && !touched && "motion-safe:animate-book-sway",
        )}
      >
        <div className={cn(FACE, BOARD, !flat && "translate-z-[5.5cqw]")}>
          <Leather ring />
          <CoverArt />
        </div>
        {!flat && (
          <>
            <div
              className={cn(FACE, BOARD, "rotate-y-180 -translate-z-[5.5cqw]")}
            >
              <Leather ring />
              <BackArt />
            </div>
            {/* Spine: centred on the left edge, turned to face left. */}
            <div
              className={cn(
                FACE,
                "inset-y-0 -left-[5.5cqw] flex w-[11cqw] -rotate-y-90 items-center justify-center overflow-hidden rounded-[1cqw] bg-linear-to-r from-(--leather-dark) from-2% to-(--leather-light) to-8%",
              )}
            >
              <Leather />
              <span
                className={cn(
                  FOIL,
                  "relative rotate-90 font-heading text-[4.2cqw] tracking-[0.08em] whitespace-nowrap",
                )}
              >
                {brand.name} · {bookCounts.total} Books
              </span>
            </div>
            {/* Page edges: the fore-edge on the right, then top and bottom. */}
            <div
              className={cn(
                FACE,
                PAGES,
                "top-[1.5cqw] bottom-[1.5cqw] left-[93.7cqw] w-[9.8cqw] rotate-y-90 bg-linear-to-r bg-size-[0.5cqw_100%]",
              )}
            />
            <div
              className={cn(
                FACE,
                PAGES,
                "right-[1.6cqw] -top-[4.3cqw] left-[0.6cqw] h-[9.8cqw] rotate-x-90 bg-linear-to-b bg-size-[100%_0.5cqw]",
              )}
            />
            <div
              className={cn(
                FACE,
                PAGES,
                "right-[1.6cqw] -bottom-[4.3cqw] left-[0.6cqw] h-[9.8cqw] -rotate-x-90 bg-linear-to-b bg-size-[100%_0.5cqw]",
              )}
            />
            {/* The ribbon marker, hanging out of the pages. */}
            <svg
              aria-hidden
              viewBox="0 0 34 150"
              preserveAspectRatio="none"
              className="absolute top-[99%] left-[30cqw] h-[15cqw] w-[3.4cqw] translate-z-[4cqw] fill-primary"
            >
              <path d="M0 0H34V150L17 126L0 150Z" />
            </svg>
          </>
        )}
      </div>
    </div>
  );
}

/** The front cover lettering, sized in cover widths. */
function CoverArt() {
  return (
    <div
      className={cn(
        FOIL,
        "absolute inset-[6cqw] flex flex-col items-center border-[0.7cqw] border-double border-current px-[5cqw] py-[9cqw] text-center",
      )}
    >
      <LampMark className="w-[16cqw]" />
      <p className="mt-[6cqw] font-heading text-[14cqw] leading-none font-semibold tracking-[0.02em]">
        {brand.name}
      </p>
      <p className="mt-[4cqw] font-heading text-[4.4cqw] leading-tight italic">
        A guide to the
        <br />
        {bookCounts.total} books of the Bible
      </p>
      <p className="mt-auto text-[2.8cqw] tracking-[0.3em] uppercase">
        Psalm 119:105
      </p>
    </div>
  );
}

function BackArt() {
  return (
    <div
      className={cn(
        FOIL,
        "absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] px-[12cqw] text-center",
      )}
    >
      <p className="text-[3.6cqw] leading-snug">
        Who wrote each book, when, why and to whom. One page for every book of
        the Bible, read in five minutes before you open it.
      </p>
      <p className="font-heading text-[5cqw]">{brand.name}</p>
    </div>
  );
}

/** The oil lamp (Psalm 119:105), debossed in gold on the cover. */
function LampMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M32 2c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11Z" />
      <path
        d="M6 28c8-6 19-8 30-8 9 0 16 2 22 6l-6 4c-3 6-11 10-20 10-7 0-13-2-17-6l-9-6Zm40 6c6-2 10-5 12-8"
        opacity=".9"
      />
      <rect x="20" y="42" width="24" height="4" rx="2" />
    </svg>
  );
}
