import { BookCover, BOOK_STAGE } from "~/components/book/BookCover";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { brand } from "~/content/brand";
import { colourIds, colours, type ColourId } from "~/content/catalog";
import { cn } from "~/lib/utils";

const names = brand.store.colourNames;

function isColourId(value: string): value is ColourId {
  return colourIds.includes(value as ColourId);
}

/** The guide's three covers as round swatches of their leather. */
export function ColourSwatches({
  value,
  onChange,
  label = `${brand.productName} cover`,
}: {
  value: ColourId;
  onChange: (id: ColourId) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(next) => {
          if (isColourId(next)) onChange(next);
        }}
        aria-label={label}
        spacing={1}
        className="flex-wrap"
      >
        {colours.map((colour) => (
          <ToggleGroupItem
            key={colour.id}
            value={colour.id}
            aria-label={names[colour.id]}
            title={names[colour.id]}
            className="ring-offset-background data-[state=on]:ring-foreground size-11 rounded-full p-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-offset-2"
          >
            <span
              aria-hidden="true"
              className="border-foreground/20 group-hover/toggle:border-foreground/50 size-9 rounded-full border"
              // Data, not styling: the cover leather from the catalogue.
              style={{ backgroundColor: colour.swatch }}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <span className="ms-1 text-sm font-medium">{names[value]}</span>
    </div>
  );
}

/** Decorative flat covers that mirror the swatches (hidden from assistive tech). */
export function ColourThumbs({
  value,
  onChange,
}: {
  value: ColourId;
  onChange: (id: ColourId) => void;
}) {
  return (
    <ul role="list" className="flex flex-wrap gap-2" aria-hidden="true">
      {colours.map((colour) => (
        <li key={colour.id}>
          <Button
            type="button"
            variant="outline"
            tabIndex={-1}
            onClick={() => onChange(colour.id)}
            className={cn(
              BOOK_STAGE,
              "flex size-14 items-center justify-center overflow-hidden rounded-sm p-0 shadow-none",
              colour.id === value
                ? "border-foreground"
                : "border-border opacity-60 hover:opacity-100",
            )}
          >
            <BookCover
              view="front"
              colour={colour.id}
              label=""
              className="w-7"
            />
          </Button>
        </li>
      ))}
    </ul>
  );
}
