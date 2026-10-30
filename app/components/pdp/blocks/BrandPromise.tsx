import { DoubleRule } from "~/components/brand/DoubleRule";
import { Eyebrow } from "~/components/brand/Eyebrow";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { brand } from "~/content/brand";
import { fillProof } from "~/content/proof";
import { cn } from "~/lib/utils";

/** A founder-style note with a sign-off, centred under a small double rule. */
export function BrandPromise() {
  const { promise } = brand.pdp;

  return (
    <div
      data-block="promise"
      className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6"
    >
      <figure className="space-y-5 p-7 text-center sm:p-10">
        <DoubleRule className="mx-auto w-24" />
        <Eyebrow className="text-muted-foreground">{promise.headline}</Eyebrow>
        <blockquote className="space-y-4">
          {promise.body.map((p, i) => (
            <p
              key={p}
              className={cn(
                "leading-relaxed",
                i === 0 && "font-heading text-2xl sm:text-3xl",
              )}
            >
              {fillProof(p)}
            </p>
          ))}
        </blockquote>
        <figcaption className="font-heading text-xl">
          — {promise.signoff}
        </figcaption>
        <PlaceholderTag kind="tbc" label="Guarantee terms to be confirmed" />
      </figure>
    </div>
  );
}
