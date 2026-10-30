// The store catalogue. Names and descriptions are brand-voiced in the
// brand's `store` block; everything commercial here
// (range, cover colours, prices) is ILLUSTRATIVE until the supplier and Russ
// confirm it. The guide's real prices come from offers.ts so both offers stay
// in sync.

import type { ImageId } from "./images";
import type { ContentStatus, Fact, FaqItem } from "./types";

export type ColourId = "saddle" | "espresso" | "black";

export type Colour = {
  id: ColourId;
  /** Swatch fill: the cover leather. */
  swatch: string;
  /** Cover leather, light to dark, for the drawn book (components/book). */
  leather: [string, string];
};

export const colours: Colour[] = [
  { id: "saddle", swatch: "#a8622f", leather: ["#b8733c", "#8a4a22"] },
  { id: "espresso", swatch: "#4a2e22", leather: ["#5d3a2a", "#3a2219"] },
  { id: "black", swatch: "#1f1c1a", leather: ["#33302d", "#161412"] },
];

export const colourIds = colours.map((c) => c.id);

/** The lead cover: the homepage feature. */
export const LEAD_COLOUR: ColourId = "saddle";

export function getColour(id: ColourId) {
  return colours.find((c) => c.id === id) ?? colours[0];
}

export type ProductId =
  "guide" | "leader-pack" | "highlighters" | "verse-cards" | "gift-card";

/** The product the SOP page sells; every other item has an item page. */
export const MAIN_PRODUCT = "guide" satisfies ProductId;

export type Category = "guides" | "accessories" | "gifts";

export type CatalogProduct = {
  id: ProductId;
  category: Category;
  /** Single-unit price. The guide's real prices live in offers.ts. */
  price: number;
  compareAt?: number;
  /** Photos (competitor stand-ins). The guide and the leader pack are also drawn in code. */
  images: ImageId[];
  /** Specs shown on the product page, each with its status. */
  specs: Fact[];
  related: ProductId[];
  /** Offers a cover colour choice (the guide and the leader pack). */
  hasColour?: boolean;
  /** Gift card denominations. */
  amounts?: number[];
  /** Searchable keywords beyond the name. */
  keywords: string[];
  /** Item page copy, shared by every concept (the guide uses its own page). */
  details?: {
    description: string[];
    highlights: string[];
    faq: FaqItem[];
  };
};

const ILLUSTRATIVE: ContentStatus = "illustrative";

export const catalog: CatalogProduct[] = [
  {
    id: "guide",
    category: "guides",
    price: 34.99,
    compareAt: 60,
    images: [
      "product-front",
      "gallery-in-use",
      "interior-exodus",
      "flatlay-coffee",
    ],
    specs: [],
    related: ["highlighters", "verse-cards", "leader-pack"],
    hasColour: true,
    keywords: [
      "bible",
      "study",
      "guide",
      "journal",
      "context",
      "scripture",
      "66 books",
      "devotional",
    ],
  },
  {
    id: "leader-pack",
    category: "guides",
    price: 129.99,
    compareAt: 174.95,
    images: ["interior-chronicles", "flatlay-autumn", "flatlay-coffee"],
    specs: [
      {
        label: "In the pack",
        value:
          "Five guides in one cover colour, printed leader notes for six sessions, and five bookmarks",
        status: ILLUSTRATIVE,
      },
      {
        label: "Compare-at",
        value: "Five guides at the single price, plus the leader notes",
        status: ILLUSTRATIVE,
      },
    ],
    related: ["highlighters", "verse-cards"],
    hasColour: true,
    keywords: ["group", "small group", "leader", "church", "ministry", "pack"],
    details: {
      description: [
        "Everything a small group needs to start: five guides in one cover colour, a printed leader's booklet with six ready-to-run sessions, and a bookmark for each member. Every session opens with one page from the guide, so the whole group starts from the same background before anyone opens a Bible.",
        "The sessions are deliberately short: ten minutes of context, a reading, three discussion questions and one step for the week. No video, no sign-ups, nothing to download.",
      ],
      highlights: [
        "Five guides in your choice of cover",
        "Six printed leader sessions",
        "Three discussion questions per session",
        "Costs less than five single guides",
      ],
      faq: [
        {
          q: "Can the guides be different colours?",
          a: "Not in the pack: all five share one cover colour. For mixed colours, choose the five-guide bundle on the guide's page.",
        },
        {
          q: "Which books do the six sessions cover?",
          a: "We're writing them now. The plan is a mix of familiar and less-read books, so groups see how the format works across the Bible.",
          status: "tbc",
        },
      ],
    },
  },
  {
    id: "highlighters",
    category: "accessories",
    price: 14.99,
    images: ["flatlay-orange", "flatlay-coffee"],
    specs: [
      {
        label: "In the set",
        value: "Six gel highlighters and two fine-tip pens",
        status: ILLUSTRATIVE,
      },
      {
        label: "Thin paper",
        value:
          "Gel and fine tips, chosen not to bleed through Bible paper (to be tested)",
        status: "tbc",
      },
    ],
    related: ["verse-cards", "guide"],
    keywords: ["highlighter", "pen", "gel", "bible-safe", "marking"],
    details: {
      description: [
        "Six soft gel highlighters and two fine-tip pens for marking your Bible and the guide's facing note pages. Gel doesn't soak into thin Bible paper the way liquid ink can, and the fine tips fit the narrow margins.",
        "Use one colour per theme (promises, commands, names of God) and the patterns start to jump off the page.",
      ],
      highlights: [
        "Six gel highlighters, two fine-tip pens",
        "Chosen for thin Bible paper (to be tested)",
        "Colour-code themes as you read",
        "Fits in the guide's back pocket",
      ],
      faq: [
        {
          q: "Will they bleed through my Bible?",
          a: "Gel and fine tips are the safest choice for thin paper, but every Bible is different. We're testing them on common Bibles before we promise anything.",
          status: "tbc",
        },
      ],
    },
  },
  {
    id: "verse-cards",
    category: "accessories",
    price: 12.99,
    images: ["flatlay-autumn", "flatlay-orange"],
    specs: [
      {
        label: "Cards",
        value: "52 memory verse cards, one for each week of the year",
        status: ILLUSTRATIVE,
      },
      {
        label: "Translation",
        value: "King James Version (public domain)",
        status: ILLUSTRATIVE,
      },
    ],
    related: ["highlighters", "guide"],
    keywords: ["memory", "verse", "cards", "scripture", "memorize"],
    details: {
      description: [
        "Fifty-two pocket cards, one verse for each week of the year, with the reference on the front and the book's one-line context on the back, so you remember where each verse comes from as well as what it says.",
        "Keep one in your pocket, on the fridge or on the dashboard, and swap it every Sunday.",
      ],
      highlights: [
        "52 cards, one a week",
        "Context for each verse on the back",
        "King James Version text",
        "Pocket size, rounded corners",
      ],
      faq: [
        {
          q: "Why the King James Version?",
          a: "It's in the public domain, so we can print it freely. We'd like to offer other translations once we've arranged permission from their publishers.",
        },
      ],
    },
  },
  {
    id: "gift-card",
    category: "gifts",
    price: 25,
    images: [],
    specs: [
      {
        label: "Delivery",
        value: "Digital, sent by email",
        status: ILLUSTRATIVE,
      },
      { label: "Expiry", value: "To be confirmed", status: "tbc" },
    ],
    related: ["guide", "leader-pack"],
    amounts: [25, 50, 100],
    keywords: ["gift", "card", "voucher", "present", "christmas"],
    details: {
      description: [
        "Not sure which cover they'd choose? Send a digital gift card and let them pick. It works on the guide, the group pack and every accessory.",
        "Gift cards are sent by email with your message.",
      ],
      highlights: [
        "$25, $50 or $100",
        "Sent by email with your message",
        "Works on everything in the store",
        "Expiry to be confirmed",
      ],
      faq: [
        {
          q: "Do discount codes work on gift cards?",
          a: "No. Discount codes don't apply to gift cards.",
        },
      ],
    },
  },
];

export function getProduct(id: ProductId) {
  return catalog.find((p) => p.id === id)!;
}

/** URL handles. The guide's handle is its brand product name. */
/** Shopify handles. The guide's handle is its brand product name (see hero-product.ts). */
export const GUIDE_HANDLE = "lamplight-bible-guide";

export function handleFor(id: ProductId) {
  return id === "guide" ? GUIDE_HANDLE : id;
}

export function productFromHandle(handle: string) {
  if (handle === GUIDE_HANDLE) return getProduct("guide");
  return catalog.find((p) => p.id === handle && p.id !== "guide");
}
