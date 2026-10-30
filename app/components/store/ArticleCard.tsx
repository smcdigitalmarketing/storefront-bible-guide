import { Link } from "react-router";

import { Eyebrow } from "~/components/brand/Eyebrow";
import { Img } from "~/components/brand/Img";
import { brand } from "~/content/brand";
import type { ImageId } from "~/content/images";
import { guideArticle } from "~/content/store-pages";
import { cn } from "~/lib/utils";

import { storePaths } from "./nav";

export type JournalArticle = {
  to: string;
  kicker: string;
  title: string;
  dek: string;
  image: ImageId;
  readTime: string;
};

/** The journal's two articles: the advertorial and the reading guide. */
export const journalArticles: JournalArticle[] = [
  {
    to: storePaths.advertorial,
    kicker: brand.advertorial.kicker,
    title: brand.advertorial.headline,
    dek: brand.advertorial.dek,
    image: brand.advertorial.leadImage,
    readTime: brand.advertorial.readTime,
  },
  {
    to: storePaths.guide,
    kicker: guideArticle.kicker,
    title: guideArticle.headline,
    dek: guideArticle.dek,
    image: guideArticle.image,
    readTime: guideArticle.readTime,
  },
];

/** An unframed journal card: the photo, small-caps kicker, serif title and dek. */
export function ArticleCard({
  article,
  large = false,
}: {
  article: JournalArticle;
  large?: boolean;
}) {
  return (
    <Link
      to={article.to}
      className="group focus-visible:ring-ring/50 block rounded-sm outline-none focus-visible:ring-3"
    >
      <div className="overflow-hidden rounded-sm">
        <Img
          image={article.image}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "w-full object-cover transition duration-700 motion-safe:group-hover:scale-105",
            large ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        />
      </div>
      <div className="space-y-2 pt-5">
        <Eyebrow className="text-muted-foreground">
          {article.kicker} · {article.readTime}
        </Eyebrow>
        <h2
          className={cn(
            "font-heading text-2xl leading-tight font-medium text-balance underline-offset-4 group-hover:underline",
            large && "sm:text-3xl",
          )}
        >
          {article.title}
        </h2>
        <p className="text-muted-foreground">{article.dek}</p>
      </div>
    </Link>
  );
}
