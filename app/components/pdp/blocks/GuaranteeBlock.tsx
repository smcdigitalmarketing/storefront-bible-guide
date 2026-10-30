import { PackageCheckIcon, ShieldCheckIcon } from "lucide-react";

import { Eyebrow } from "~/components/brand/Eyebrow";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { brand } from "~/content/brand";
import { proof } from "~/content/proof";

/** SOP closing: spell out the guarantee and how to claim it (proposed terms). */
export function GuaranteeBlock() {
  const { guarantee, warranty } = proof;

  return (
    <div
      data-block="guarantee-steps"
      data-proof="guarantee"
      className="mx-auto mt-10 max-w-5xl rounded-sm border border-border bg-card p-6 text-card-foreground sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        {/* A thin oxblood seal. */}
        <span className="flex size-20 items-center justify-center rounded-full border border-primary text-primary">
          <ShieldCheckIcon aria-hidden className="size-9 stroke-[1.25]" />
        </span>
        <div className="space-y-2">
          <h3 className="flex flex-wrap items-center gap-2 font-heading text-2xl font-normal sm:text-3xl">
            {brand.pdp.guaranteeHeadline}
            <PlaceholderTag kind="tbc" label="Proposed terms" />
          </h3>
          <p className="text-lg">{guarantee.body}</p>
        </div>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {guarantee.steps.map((step, i) => (
          <li
            key={step.title}
            className="space-y-1.5 border-t border-border pt-5"
          >
            <Eyebrow className="text-sm text-muted-foreground">
              Step {i + 1}
            </Eyebrow>
            <p className="font-heading text-lg">{step.title}</p>
            <p className="text-sm text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 flex items-start gap-3 text-sm">
        <PackageCheckIcon
          aria-hidden
          className="mt-0.5 size-5 shrink-0 stroke-[1.25] text-primary"
        />
        <span>
          <span className="font-semibold">{warranty.title}.</span>{" "}
          {warranty.body}
        </span>
      </p>
    </div>
  );
}
