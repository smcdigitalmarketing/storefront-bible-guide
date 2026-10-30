import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { proof } from "~/content/proof";
import { cn } from "~/lib/utils";

/**
 * Customer photo wall: review photos and sample shots, all competitor
 * originals. Tall 4:5 frames, every third one stepped down a little.
 */
export function PhotoWall({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {proof.ugc.map((image, i) => (
          <li key={image} className={cn(i % 3 === 1 && "sm:translate-y-6")}>
            <Img
              image={image}
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </li>
        ))}
      </ul>
      <PlaceholderTag
        kind="competitor"
        label="Customer and sample photos from the competitor's store"
        className="mt-10"
      />
    </div>
  );
}
