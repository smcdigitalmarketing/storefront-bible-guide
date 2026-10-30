// Image registry. Every <img> of brand imagery resolves through here, so
// swapping a stand-in for final photography never touches a component.
// Generated once from the retro-camera mock (apps/bible-guide:
// scripts/image-slots.ts and content/image-status.json); files are served from
// public/images/guide. Every image is a "competitor-original": a competitor
// stand-in showing the competitor's cover, labelled where shown. The drawn
// book (components/book) shows our own cover until a shoot replaces these.

export type ImageStatus = "generated" | "competitor-original";

export type SiteImage = {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  status: ImageStatus;
  /** Competitor assets the image was made from (the mock's asset-sources.ts ids). */
  from: string[];
};

export const images = {
  "product-front": {
    id: "product-front",
    src: "/images/guide/product/front.webp",
    srcSet:
      "/images/guide/product/front-800.webp 800w, /images/guide/product/front.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The closed guide, front cover",
    status: "competitor-original",
    from: ["product-front"],
  },
  "product-angle": {
    id: "product-angle",
    src: "/images/guide/product/angle.webp",
    srcSet:
      "/images/guide/product/angle-800.webp 800w, /images/guide/product/angle.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The closed guide at an angle, with its ribbon marker",
    status: "competitor-original",
    from: ["product-angle"],
  },
  "open-pages": {
    id: "open-pages",
    src: "/images/guide/product/open.webp",
    srcSet:
      "/images/guide/product/open-800.webp 800w, /images/guide/product/open.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide standing open with its pages fanned",
    status: "competitor-original",
    from: ["open-pages"],
  },
  "interior-exodus": {
    id: "interior-exodus",
    src: "/images/guide/product/exodus.webp",
    srcSet:
      "/images/guide/product/exodus-800.webp 800w, /images/guide/product/exodus.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide open at the page on Exodus",
    status: "competitor-original",
    from: ["interior-exodus"],
  },
  "interior-chronicles": {
    id: "interior-chronicles",
    src: "/images/guide/product/chronicles.webp",
    srcSet:
      "/images/guide/product/chronicles-800.webp 800w, /images/guide/product/chronicles.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide open at the page on 2 Chronicles",
    status: "competitor-original",
    from: ["interior-chronicles"],
  },
  "gallery-in-use": {
    id: "gallery-in-use",
    src: "/images/guide/lifestyle/reader.webp",
    srcSet:
      "/images/guide/lifestyle/reader-800.webp 800w, /images/guide/lifestyle/reader.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "A woman on a bench reading the guide",
    status: "competitor-original",
    from: ["reader"],
  },
  holding: {
    id: "holding",
    src: "/images/guide/lifestyle/holding.webp",
    srcSet:
      "/images/guide/lifestyle/holding-800.webp 800w, /images/guide/lifestyle/holding.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "A woman holding up the guide and smiling",
    status: "competitor-original",
    from: ["holding"],
  },
  "flatlay-autumn": {
    id: "flatlay-autumn",
    src: "/images/guide/lifestyle/autumn.webp",
    srcSet:
      "/images/guide/lifestyle/autumn-800.webp 800w, /images/guide/lifestyle/autumn.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide on a wooden table among autumn leaves",
    status: "competitor-original",
    from: ["flatlay-autumn"],
  },
  "flatlay-coffee": {
    id: "flatlay-coffee",
    src: "/images/guide/lifestyle/coffee.webp",
    srcSet:
      "/images/guide/lifestyle/coffee-800.webp 800w, /images/guide/lifestyle/coffee.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide beside a cup of tea, greenery and a notebook",
    status: "competitor-original",
    from: ["flatlay-coffee"],
  },
  "flatlay-orange": {
    id: "flatlay-orange",
    src: "/images/guide/lifestyle/orange.webp",
    srcSet:
      "/images/guide/lifestyle/orange-800.webp 800w, /images/guide/lifestyle/orange.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide beside a dried orange slice and greenery",
    status: "competitor-original",
    from: ["flatlay-orange"],
  },
  "book-wood": {
    id: "book-wood",
    src: "/images/guide/lifestyle/wood.webp",
    srcSet:
      "/images/guide/lifestyle/wood-800.webp 800w, /images/guide/lifestyle/wood.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "The guide on weathered wood with its ribbon",
    status: "competitor-original",
    from: ["book-wood"],
  },
  "customer-hand": {
    id: "customer-hand",
    src: "/images/guide/reviews/hand.webp",
    srcSet:
      "/images/guide/reviews/hand-800.webp 800w, /images/guide/reviews/hand.webp 1200w",
    width: 1200,
    height: 1200,
    alt: "A customer holding the guide outdoors in the sun",
    status: "competitor-original",
    from: ["customer-hand"],
  },
} as const satisfies Record<string, SiteImage>;

export type ImageId = keyof typeof images;

/** The auto-scrolling lifestyle strip (SOP section 4). */
export const stripImages: SiteImage[] = (
  [
    "flatlay-coffee",
    "interior-exodus",
    "gallery-in-use",
    "flatlay-autumn",
    "open-pages",
    "customer-hand",
    "flatlay-orange",
    "interior-chronicles",
    "book-wood",
  ] as ImageId[]
).map((id) => images[id]);
