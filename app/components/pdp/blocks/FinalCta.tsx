import { ArrowUpIcon } from "lucide-react";

import { RatingBadge } from "~/components/proof/Rating";
import { Button } from "~/components/ui/button";
import { brand } from "~/content/brand";
import { fillProof } from "~/content/proof";

/**
 * The last call to action on an ink panel: rating, offer recap and a
 * parchment button back to the buy box.
 */
export function FinalCta() {
  const { finalCta } = brand.pdp;

  return (
    <div
      data-block="final-cta"
      className="bg-foreground px-4 py-16 text-background sm:px-6 sm:py-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <RatingBadge onDark className="justify-center" href="#reviews" />
        <h2 className="font-heading text-4xl leading-tight font-normal text-balance sm:text-5xl">
          {finalCta.headline}
        </h2>
        <p className="max-w-xl text-lg opacity-90">
          {fillProof(finalCta.body)}
        </p>
        {/* Back up to the buy box (#buy), as the mock does. */}
        <Button
          asChild
          className="h-auto min-h-12 gap-2 rounded-sm bg-background px-8 py-3 font-heading text-sm font-semibold tracking-[0.12em] whitespace-normal text-foreground uppercase hover:bg-primary hover:text-primary-foreground focus-visible:ring-background/60"
        >
          <a href="#buy">
            {finalCta.cta}
            <ArrowUpIcon aria-hidden className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
