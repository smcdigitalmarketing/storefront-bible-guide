import { CheckIcon } from "lucide-react";

import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { SectionHeading } from "~/components/brand/SectionHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { brand } from "~/content/brand";
import { product } from "~/content/product";
import { cn } from "~/lib/utils";

import { BrandPromise } from "../blocks/BrandPromise";
import { CompleteTheKit } from "../blocks/CompleteTheKit";
import { FeatureCallouts } from "../blocks/FeatureCallouts";
import { ProblemSolution } from "../blocks/ProblemSolution";
import { UseCases } from "../blocks/UseCases";

/**
 * SOP section 6: why we made it, benefit headlines with an image that backs
 * them up, the feature callouts, use cases, how it works, a stats band and a
 * comparison table, then the brand's promise and the add-ons. Stats are
 * listed specs, not performance claims.
 */
export function ValueProps() {
  return (
    <section
      data-sop-section="value-props"
      aria-labelledby="value-heading"
      className="py-16 sm:py-24"
    >
      <ProblemSolution />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="value-heading"
          sub={brand.pdp.valuePropsSub}
          align="center"
        >
          {brand.pdp.valuePropsHeadline}
        </SectionHeading>
        <div className="mt-10 sm:mt-14">
          <Alternating />
        </div>
      </div>
      <FeatureCallouts />
      <UseCases />
      <HowItWorks />
      <StatsBand />
      <ComparisonTable />
      <BrandPromise />
      <CompleteTheKit />
    </section>
  );
}

const NUMERALS = ["I", "II", "III", "IV"];
const STEP_WORDS = ["one", "two", "three", "four"];

/** Lamplight's value props: tall 4:5 photos on alternating sides, numbered I–IV. */
function Alternating() {
  return (
    <ul className="space-y-16 sm:space-y-24">
      {brand.pdp.valueProps.map((vp, i) => (
        <li
          key={vp.headline}
          className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
        >
          <Img
            image={vp.image}
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn(
              "aspect-[4/5] w-full object-cover",
              i % 2 === 1 && "md:order-2",
            )}
          />
          <div className="max-w-md space-y-4">
            <Eyebrow className="text-base">{NUMERALS[i] ?? i + 1}</Eyebrow>
            <h3 className="font-heading text-3xl leading-tight font-normal sm:text-4xl">
              {vp.headline}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {vp.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function HowItWorks() {
  return (
    <div
      id="how-it-works"
      className="mx-auto mt-20 max-w-7xl scroll-mt-4 px-4 sm:mt-28 sm:px-6"
    >
      <SectionHeading
        eyebrow={`${product.howItWorks.length} steps`}
        align="center"
      >
        {brand.pdp.howItWorksHeadline}
      </SectionHeading>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {product.howItWorks.map((step, i) => (
          <li key={step.title}>
            <Img
              image={step.image}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-1 pt-4">
              <p className="font-heading text-sm text-muted-foreground">
                Step {STEP_WORDS[i] ?? i + 1}
              </p>
              <h3 className="font-heading text-xl font-normal">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The format in numbers, centred between two hairlines. */
function StatsBand() {
  return (
    <div className="mt-20 border-y border-border sm:mt-28">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {product.stats.map((stat) => (
          <div key={stat.label} className="px-2 text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-heading text-5xl leading-none font-normal lining-nums tabular-nums sm:text-6xl">
              {stat.value}
            </dd>
            <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mx-auto flex max-w-7xl justify-center px-4 pb-6 sm:px-6">
        <PlaceholderTag
          kind="listed"
          label="Specs as listed by the competitor, to be confirmed"
        />
      </p>
    </div>
  );
}

function ComparisonTable() {
  const { columns, rows } = product.comparison;
  const headers = [brand.name, ...columns.slice(1)];

  return (
    <div className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
      <SectionHeading align="center">
        {brand.pdp.comparisonHeadline}
      </SectionHeading>
      <div className="mt-10">
        <Table className="min-w-[34rem] border-collapse text-sm sm:text-base">
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="hover:bg-transparent">
              <TableHead scope="col" className="sr-only">
                Feature
              </TableHead>
              {headers.map((h, i) => (
                <TableHead
                  key={h}
                  scope="col"
                  className={cn(
                    "h-auto px-3 py-4 text-center font-heading text-base font-semibold whitespace-normal text-foreground sm:text-lg",
                    // Our column: an oxblood rule and the italic.
                    i === 0 && "border-b-2 border-primary italic",
                  )}
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                className="border-b border-border hover:bg-transparent"
              >
                <TableHead
                  scope="row"
                  className="h-auto py-4 ps-0 pe-4 text-start font-semibold whitespace-normal text-foreground"
                >
                  {row.label}
                </TableHead>
                {row.values.map((v, i) => (
                  <TableCell
                    key={i}
                    className={cn(
                      "px-3 py-4 text-center whitespace-normal",
                      i === 0 && "font-semibold",
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {i === 0 ? (
                        <CheckIcon
                          aria-hidden
                          className="size-4 shrink-0 text-primary"
                          strokeWidth={3}
                        />
                      ) : null}
                      {v}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Criteria chosen by us. Study Bibles and commentaries vary, and many are
        excellent companions to a guide like this.
      </p>
    </div>
  );
}
