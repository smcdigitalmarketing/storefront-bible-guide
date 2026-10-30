import { DoubleRule } from "~/components/brand/DoubleRule";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { SectionHeading } from "~/components/brand/SectionHeading";
import { brand } from "~/content/brand";
import { images } from "~/content/images";
import { cn } from "~/lib/utils";

/**
 * "Why we made it": the problem the product answers, in the brand's voice,
 * closed by a small double rule.
 */
export function ProblemSolution() {
  const { problem } = brand.pdp;

  return (
    <div
      data-block="problem"
      className={cn(
        "mx-auto mb-20 grid max-w-7xl items-center gap-10 px-4 sm:mb-28 sm:px-6",
        problem.image && "lg:grid-cols-2 lg:gap-16",
      )}
    >
      {problem.image ? (
        <div className="relative">
          <Img
            image={problem.image}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          {images[problem.image].status === "competitor-original" ? (
            <PlaceholderTag
              kind="competitor"
              className="absolute bottom-2 left-2 bg-background"
            />
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          "space-y-5",
          !problem.image && "mx-auto max-w-3xl text-center",
        )}
      >
        <SectionHeading
          eyebrow={problem.eyebrow}
          align={problem.image ? "start" : "center"}
        >
          {problem.headline}
        </SectionHeading>
        {problem.body.map((p, i) => (
          <p
            key={p}
            className={cn(
              "leading-relaxed",
              i === 0 ? "font-heading text-xl" : "text-muted-foreground",
            )}
          >
            {p}
          </p>
        ))}
        <DoubleRule className={cn("w-24", !problem.image && "mx-auto")} />
      </div>
    </div>
  );
}
