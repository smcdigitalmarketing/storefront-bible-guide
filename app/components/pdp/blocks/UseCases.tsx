import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { SectionHeading } from "~/components/brand/SectionHeading";
import { brand } from "~/content/brand";
import { images } from "~/content/images";

/** Four situations the product is made for, each under a tall 3:4 photo. */
export function UseCases() {
  const { useCases } = brand.pdp;

  return (
    <div
      data-block="use-cases"
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6"
    >
      <SectionHeading align="center">{useCases.headline}</SectionHeading>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.items.map((item) => (
          <li key={item.title}>
            <Img
              image={item.image}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="space-y-2 pt-5">
              <h3 className="font-heading text-xl font-normal">{item.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">
                {item.body}
              </p>
              {images[item.image].status === "competitor-original" ? (
                <PlaceholderTag kind="competitor" />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
