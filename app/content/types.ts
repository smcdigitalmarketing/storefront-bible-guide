import type { ColourId, ProductId } from "./catalog";
import type { ImageId } from "./images";
import type { VerseRef } from "./scripture";

export type ConceptId = "lamplight";
export type OfferId = "standard" | "early-black-friday";
export type BundleId = "one" | "three" | "five";
export type GiftId = "reading-plan" | "group-guide" | "verse-printables";

/**
 * Where a piece of content stands. Only "confirmed" may go live; everything
 * else is shown with a visible label in the POC.
 */
export type ContentStatus =
  "confirmed" | "competitor-listed" | "tbc" | "illustrative" | "placeholder";

export type Fact = {
  label: string;
  value: string;
  status: ContentStatus;
  source?: string;
  note?: string;
};

export type IconName =
  | "book"
  | "context"
  | "clock"
  | "pen"
  | "group"
  | "gift"
  | "ribbon"
  | "type"
  | "sparkle";

export type Step = { title: string; body: string; image: ImageId };

export type FaqItem = {
  q: string;
  a: string;
  status?: ContentStatus;
  /** Heading the FAQ groups it under. */
  category?: string;
};

export type Gift = {
  id: GiftId;
  name: string;
  value: number;
  image: ImageId;
};

export type Bundle = {
  id: BundleId;
  quantity: number;
  price: number;
  compareAt: number;
  gifts: GiftId[];
  badge?: string;
};

export type Offer = {
  id: OfferId;
  name: string;
  /** Every price in the POC is illustrative until Russ approves terms. */
  illustrative: true;
  bundles: Bundle[];
  defaultBundle: BundleId;
};

/**
 * A placeholder review. "adapted" ones are lightly rewritten competitor
 * reviews (the original text is kept); "illustrative" ones were written for
 * the concept to cover a theme. Both are labelled on the page and must be
 * replaced with our own verified reviews before launch.
 */
export type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** ISO date shown on the card. */
  date: string;
  /** What they bought, shown with the concept's own names. */
  variant?: { bundle?: BundleId; colour?: ColourId; size?: string };
  /** Theme ids from content/proof.ts, used by the filter chips. */
  tags: string[];
  photo?: ImageId;
  kind: "adapted" | "illustrative";
  /** The competitor review an adapted placeholder came from. */
  original?: string;
  source: string;
  sourceUrl?: string;
  /** Shown on the walls; critical reviews stay in data as product insight. */
  featured: boolean;
  /** The product it's about; defaults to the guide. */
  product?: ProductId;
  /** Illustrative "helpful" votes. */
  helpful: number;
  /** The brand's public reply (critical reviews get one). */
  reply?: string;
};

export type Layout = {
  header: "centred" | "left";
  hero: "gallery-left" | "gallery-right" | "headline-first";
  bundlePicker: "columns" | "stacked" | "spec-sheet";
  reviews: "sticky-notes" | "pull-quotes" | "log-rows";
  valueProps: "bento" | "alternating" | "numbered";
  divider: "wave" | "double-rule" | "perforation";
};

export type Swatch = { name: string; hex: string; role: string };

export type FontPairing = {
  heading: { family: string; weights: string };
  body: { family: string; weights: string };
  /** Google Fonts css2 URL with only the weights in use. */
  href: string;
};

export type ValueProp = { headline: string; body: string; image: ImageId };

export type GalleryCopy = {
  benefit: { eyebrow: string; headline: string; sub: string };
  inUse: { headline: string; sub: string };
  /** SOP slide 3: the same passage read without and with the page's background. */
  comparison: { headline: string; left: string; right: string; note: string };
  included: { headline: string };
  howItWorks: { headline: string };
  versus: { headline: string };
  review: { headline: string; reviewId: string };
};

export type OfferCopy = {
  banner: string;
  eyebrow: string;
  headline?: string;
  cta: string;
  badge: string;
};

export type AdvertorialSection = {
  title: string;
  body: string[];
  /** Label for content that must be replaced before launch (e.g. expert review). */
  placeholder?: string;
  image?: ImageId;
  caption?: string;
  cta?: string;
  /** A King James verse shown after the section (content/scripture.ts). */
  verse?: VerseRef;
};

export type Advertorial = {
  kicker: string;
  headline: string;
  dek: string;
  byline: string;
  readTime: string;
  leadImage: ImageId;
  leadCaption: string;
  intro: string[];
  sections: AdvertorialSection[];
  closing: { headline: string; body: string; cta: string };
};

export type StoreCopy = {
  products: Record<ProductId, { name: string; blurb: string }>;
  colourNames: Record<ColourId, string>;
  /** Page-transition personality. */
  motion: "pop" | "drift" | "shutter";
  nav: {
    shop: string;
    product: string;
    how: string;
    journal: string;
    about: string;
  };
  home: {
    hero: {
      eyebrow: string;
      headline: string;
      sub: string;
      cta: string;
      secondary: string;
      image: ImageId;
    };
    ticker: string[];
    featured: { eyebrow: string; headline: string; body: string; cta: string };
    /** "Inside the guide": a sample page beside the index of all 66 books. */
    inside: { eyebrow: string; headline: string; body: string };
    howHeadline: string;
    reviewsHeadline: string;
    accessoriesHeadline: string;
    story: { headline: string; body: string; image: ImageId; cta: string };
    journalHeadline: string;
    newsletter: {
      headline: string;
      body: string;
      cta: string;
      success: string;
    };
  };
  shop: { headline: string; sub: string };
  about: {
    headline: string;
    intro: string;
    image: ImageId;
    sections: { title: string; body: string; image: ImageId }[];
    values: { title: string; body: string }[];
  };
  contact: { headline: string; body: string };
  cart: { empty: string; upsell: string };
  thankYou: { headline: string; body: string };
  notFound: { headline: string; body: string };
};

export type BrandConcept = {
  id: ConceptId;
  letter: "A" | "B" | "C";
  direction: string;
  name: string;
  productName: string;
  tagline: string;
  story: string;
  audience: string;
  positioning: string;
  personality: string[];
  hypothesis: string;
  traffic: string;
  photography: string;
  packaging: string;
  promotion: string;
  logoNote: string;
  palette: Swatch[];
  fonts: FontPairing;
  layout: Layout;
  compare: { heroImage: ImageId; headline: string; cta: string };
  bundleNames: Record<BundleId, { title: string; subtitle: string }>;
  offers: Record<OfferId, OfferCopy>;
  pdp: {
    eyebrow: string;
    titleBenefit: string;
    subheadline: string;
    bullets: { icon: IconName; text: string }[];
    stepHeading: string;
    /** Heading for the cover colour step after the bundle cards. */
    colourStep: string;
    /** Short review shown under the main button. */
    underButtonReview: string;
    gallery: GalleryCopy;
    /** The long product description, in the brand's voice. */
    description: string[];
    whyLove: { title: string; body: string }[];
    /** "Why we made it": the problem the product answers. */
    problem: {
      eyebrow: string;
      headline: string;
      body: string[];
      image?: ImageId;
    };
    useCases: {
      headline: string;
      items: { title: string; body: string; image: ImageId }[];
    };
    calloutsHeadline: string;
    promise: { headline: string; body: string[]; signoff: string };
    /** Social proof line above the title; "{customers}" is replaced from proof.ts. */
    proofLine: string;
    pressHeadline: string;
    ugcHeadline: string;
    expertHeadline: string;
    qnaHeadline: string;
    kitHeadline: string;
    guaranteeHeadline: string;
    finalCta: { headline: string; body: string; cta: string };
    stripHeadline: string;
    reviewsHeadline: string;
    /** "{rating}" and "{count}" are replaced from proof.ts (SOP: a real number). */
    reviewsSub: string;
    valuePropsHeadline: string;
    valuePropsSub: string;
    valueProps: ValueProp[];
    howItWorksHeadline: string;
    comparisonHeadline: string;
    closingHeadline: string;
    faqHeadline: string;
    footerBlurb: string;
  };
  advertorial: Advertorial;
  /** Slug of the advertorial in the store journal. */
  advertorialSlug: string;
  store: StoreCopy;
};
