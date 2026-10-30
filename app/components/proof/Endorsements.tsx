import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { brand } from "~/content/brand";
import { proof } from "~/content/proof";
import { cn } from "~/lib/utils";

/** Expert slot: a placeholder until a real, consenting expert is found. */
export function ExpertQuote({ className }: { className?: string }) {
  const { expert } = proof;
  return (
    <figure
      data-proof="expert"
      className={cn(
        "grid items-center gap-6 border-y border-border py-10 sm:grid-cols-[9rem_1fr] sm:gap-8",
        className,
      )}
    >
      <Img
        image={expert.image}
        sizes="9rem"
        alt=""
        className="aspect-square w-28 rounded-full object-cover grayscale-[40%] sm:w-full"
      />
      <div className="space-y-4">
        <Eyebrow className="text-sm">{brand.pdp.expertHeadline}</Eyebrow>
        <blockquote className="font-heading text-2xl leading-snug text-balance sm:text-3xl">
          “{expert.quote}”
        </blockquote>
        <figcaption className="space-y-2 text-sm">
          <span className="block font-semibold">{expert.name}</span>
          <span className="block text-muted-foreground">{expert.role}</span>
          <PlaceholderTag
            kind="placeholder"
            label="Expert slot: replace with a real, consenting expert"
          />
        </figcaption>
      </div>
    </figure>
  );
}

/** Press slots. Outlet names are placeholders, never real publications. */
export function PressQuotes({ className }: { className?: string }) {
  return (
    <div data-proof="press" className={className}>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-center">
        <Eyebrow asChild className="font-sans">
          <h3>{brand.pdp.pressHeadline}</h3>
        </Eyebrow>
        <PlaceholderTag
          kind="placeholder"
          label="Press slots: placeholder outlets and quotes"
        />
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {proof.press.map((item, i) => (
          <li
            key={i}
            className="flex flex-col gap-4 border-t border-border p-5 pt-6 text-center md:px-6"
          >
            <blockquote className="flex-1 font-heading text-xl text-balance">
              “{item.quote}”
            </blockquote>
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              {item.outlet}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
