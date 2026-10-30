import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Eyebrow } from "~/components/brand/Eyebrow";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { books, getBook, samplePages, sections } from "~/content/books";
import { cn } from "~/lib/utils";

import { SamplePage } from "./SamplePage";

/** "Look inside": the four sample pages, one at a time, with page controls. */
export function LookInsideDialog({
  open,
  onOpenChange,
  initialBook,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** A sample book's id ("genesis", "exodus", "psalms", "john"). */
  initialBook?: string;
}) {
  const start = Math.max(
    0,
    samplePages.findIndex((p) => p.bookId === initialBook),
  );
  const [index, setIndex] = useState(start);
  useEffect(() => {
    if (open) setIndex(start);
  }, [open, start]);
  const page = samplePages[index];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-look-inside
        aria-describedby={undefined}
        className="max-h-[94dvh] gap-0 overflow-y-auto p-4 sm:max-w-xl sm:p-6"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2 pe-8">
          <DialogTitle className="text-xl">
            Look inside: {getBook(page.bookId).name}
          </DialogTitle>
          <PlaceholderTag
            kind="placeholder"
            label="Sample pages, to be reviewed before print"
          />
        </div>
        <SamplePage
          page={page}
          className="mx-auto max-w-md shadow-[0_18px_40px_-20px] shadow-foreground/45"
        />
        <PageControls index={index} onChange={setIndex} className="mt-4" />
      </DialogContent>
    </Dialog>
  );
}

/** Previous and next, with a pill for each sample book. */
function PageControls({
  index,
  onChange,
  className,
}: {
  index: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  const n = samplePages.length;
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange((index - 1 + n) % n)}
        aria-label="Previous sample page"
        className="size-11 shrink-0 rounded-full"
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
      <ol className="flex flex-wrap justify-center gap-1.5">
        {samplePages.map((p, i) => (
          <li key={p.bookId}>
            <Button
              size="sm"
              variant={i === index ? "default" : "ghost"}
              aria-current={i === index ? "true" : undefined}
              onClick={() => onChange(i)}
              className="rounded-full px-3"
            >
              {getBook(p.bookId).name}
            </Button>
          </li>
        ))}
      </ol>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange((index + 1) % n)}
        aria-label="Next sample page"
        className="size-11 shrink-0 rounded-full"
      >
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}

/** A link-style button that opens "Look inside", optionally at one book. */
export function LookInsideButton({
  className,
  initialBook,
  children = "Look inside",
}: {
  className?: string;
  initialBook?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="link"
        onClick={() => setOpen(true)}
        className={cn("h-auto gap-1.5 p-0 font-semibold", className)}
      >
        <BookOpenIcon aria-hidden />
        {children}
      </Button>
      <LookInsideDialog
        open={open}
        onOpenChange={setOpen}
        initialBook={initialBook}
      />
    </>
  );
}

/** Whether the visitor asks for reduced motion, kept up to date. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * The gallery's demo slot: the sample pages turning one after another every
 * 3.6s, with no sound, and a pause button. Under reduced motion it is one
 * still page with no button.
 */
export function PageFlip({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % samplePages.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, [playing, reduced]);

  return (
    <div data-page-flip={index} className={cn("relative", className)}>
      <div className="relative perspective-[1800px]">
        <SamplePage
          key={samplePages[index].bookId}
          page={samplePages[index]}
          className="origin-left shadow-[0_18px_40px_-20px] shadow-foreground/50 motion-safe:animate-page-turn"
        />
      </div>
      {!reduced && (
        <Button
          size="icon"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={!playing}
          aria-label={playing ? "Pause the page turns" : "Play the page turns"}
          className="absolute end-2 bottom-2 rounded-full motion-reduce:hidden"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}
    </div>
  );
}

/** All 66 books by section; the four sample books open "Look inside". */
export function BookIndex({ className }: { className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const samples = new Set(samplePages.map((p) => p.bookId));

  return (
    <div data-book-index={books.length} className={className}>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {(["Old", "New"] as const).map((testament) => (
          <div key={testament} className="space-y-4">
            <Eyebrow className="text-sm font-semibold">
              {testament} Testament ·{" "}
              {books.filter((b) => b.testament === testament).length} books
            </Eyebrow>
            {sections
              .filter((s) => s.books[0].testament === testament)
              .map((s) => (
                <div key={`${testament}-${s.section}`}>
                  <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {s.section}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.books.map((b) => (
                      <li key={b.id} data-book={b.id}>
                        {samples.has(b.id) ? (
                          <Button
                            size="xs"
                            onClick={() => setOpen(b.id)}
                            className="font-semibold"
                          >
                            {b.name}
                            <BookOpenIcon aria-hidden />
                            <span className="sr-only">
                              : open the sample page
                            </span>
                          </Button>
                        ) : (
                          <span className="inline-flex h-6 items-center rounded-md border px-2 text-xs">
                            {b.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
      <LookInsideDialog
        open={open !== null}
        onOpenChange={(o) => !o && setOpen(null)}
        initialBook={open ?? undefined}
      />
    </div>
  );
}
