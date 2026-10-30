import { Verse } from "~/components/book/SamplePage";
import { Divider } from "~/components/brand/Divider";
import { Img } from "~/components/brand/Img";
import { PlaceholderTag } from "~/components/brand/PlaceholderTag";
import { BrandLinkButton } from "~/components/store/BrandButton";
import { PRODUCT_PATH } from "~/components/store/nav";
import { PageTitle } from "~/components/store/PageTitle";
import { brand } from "~/content/brand";
import {
  formatPageTitle,
  getShopNameFromRootMatch,
} from "~/lib/storefront-shop";
import { cn } from "~/lib/utils";

import type { Route } from "./+types/about";

export function meta({ matches }: Route.MetaArgs) {
  return [
    {
      title: formatPageTitle(
        brand.store.nav.about,
        getShopNameFromRootMatch(matches[0]),
      ),
    },
    { name: "description", content: brand.store.about.intro },
  ];
}

export default function About() {
  const about = brand.store.about;
  return (
    <main className="flex-1 pb-24" id="main-content" tabIndex={-1}>
      <PageTitle
        eyebrow={brand.store.nav.about}
        title={about.headline}
        intro={about.intro}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <figure>
          <div className="overflow-hidden rounded-sm">
            <Img
              image={about.image}
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="aspect-[16/9] w-full object-cover motion-safe:animate-kenburns"
            />
          </div>
          <figcaption className="mt-3 flex justify-center">
            <PlaceholderTag
              kind="competitor"
              label="Competitor photo, used as a placeholder"
            />
          </figcaption>
        </figure>

        <p className="font-heading mx-auto mt-16 max-w-3xl text-center text-2xl leading-relaxed sm:text-3xl">
          {brand.story}
        </p>
        <Verse
          id="psalm-119-105"
          className="mx-auto mt-10 max-w-xl border-y py-6 text-center"
          quoteClassName="font-heading text-2xl leading-snug italic"
        />

        <div className="mt-24 space-y-20">
          {about.sections.map((section, i) => (
            <section
              key={section.title}
              aria-labelledby={`about-section-${i}`}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <figure className={cn(i % 2 && "md:order-2")}>
                <div className="overflow-hidden rounded-sm">
                  <Img
                    image={section.image}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3">
                  <PlaceholderTag kind="competitor" />
                </figcaption>
              </figure>
              <div className="space-y-4">
                <h2
                  id={`about-section-${i}`}
                  className="font-heading text-3xl leading-tight font-medium sm:text-4xl"
                >
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {section.body}
                </p>
              </div>
            </section>
          ))}
        </div>

        <Divider className="mt-24" />

        <section aria-labelledby="values-heading" className="mt-20">
          <h2
            id="values-heading"
            className="font-heading mb-10 text-center text-3xl font-medium sm:text-4xl"
          >
            What we stand for
          </h2>
          <ul role="list" className="grid gap-8 md:grid-cols-3">
            {about.values.map((value) => (
              <li
                key={value.title}
                className="border-foreground space-y-2 border-t px-4 pt-6 text-center"
              >
                <h3 className="font-heading text-2xl font-medium">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 flex justify-center">
          <BrandLinkButton to={PRODUCT_PATH} size="lg">
            {brand.compare.cta}
          </BrandLinkButton>
        </div>
      </div>
    </main>
  );
}
