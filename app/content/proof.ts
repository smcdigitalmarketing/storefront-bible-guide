// Trust and proof content shared by every concept: the rating, customer
// count, review themes, press and expert slots, guarantee, shipping promise
// and customer questions.
//
// NOTHING HERE IS REAL YET. We have no customers, ratings, press or experts.
// Every number and quote is illustrative so the concepts can be judged as a
// real store would look, and each one is shown with a dashed label (the tester
// panel can hide them). Before launch, replace:
// - rating, themes and itemRatings: with the reviews provider's live numbers
// - customers: with the real order count, or remove it
// - press and expert: with real, consenting outlets and people, or remove them
// - guarantee, shipping and warranty: with the terms Russ approves
// - qna: with questions customers actually asked

import type { ProductId } from "./catalog";
import type { ImageId } from "./images";
import type { ContentStatus } from "./types";

type Rating = {
  /** Number of 5, 4, 3, 2 and 1 star reviews, in that order. */
  distribution: [number, number, number, number, number];
  /** Percent who would recommend it to a friend. */
  recommend: number;
  status: ContentStatus;
};

function summarise(rating: Rating) {
  const count = rating.distribution.reduce((sum, n) => sum + n, 0);
  const total = rating.distribution.reduce((sum, n, i) => sum + n * (5 - i), 0);
  return { ...rating, count, average: Math.round((total / count) * 10) / 10 };
}

export const proof = {
  rating: summarise({
    distribution: [968, 132, 30, 9, 7],
    recommend: 96,
    status: "illustrative",
  }),

  customers: {
    value: "18,000+",
    label: "readers",
    status: "illustrative" as ContentStatus,
  },

  /** Review themes, used as filter chips. Ids match Review.tags. */
  themes: [
    { id: "clarity", label: "Easy to understand" },
    { id: "context", label: "History and context" },
    { id: "group", label: "Small groups" },
    { id: "daily", label: "Daily study" },
    { id: "gift", label: "Gifting" },
    { id: "quality", label: "Cover and quality" },
    { id: "service", label: "Delivery and service" },
  ],

  /** Item page ratings. */
  itemRatings: {
    "leader-pack": summarise({
      distribution: [88, 12, 3, 1, 0],
      recommend: 97,
      status: "illustrative",
    }),
    highlighters: summarise({
      distribution: [143, 31, 9, 3, 2],
      recommend: 93,
      status: "illustrative",
    }),
    "verse-cards": summarise({
      distribution: [112, 14, 4, 1, 1],
      recommend: 96,
      status: "illustrative",
    }),
    "gift-card": summarise({
      distribution: [41, 3, 0, 0, 0],
      recommend: 100,
      status: "illustrative",
    }),
  } satisfies Partial<Record<ProductId, unknown>>,

  /** Press slots. Outlet names stay placeholders: never a real publication. */
  press: [
    {
      outlet: "Outlet name (placeholder)",
      quote:
        "One page per book, read before you open it: a simple idea, done carefully.",
    },
    {
      outlet: "Outlet name (placeholder)",
      quote:
        "The rare study tool that's as useful for a small group as for a quiet morning on your own.",
    },
    {
      outlet: "Outlet name (placeholder)",
      quote:
        "Plain language, sensible scholarship and print you can actually read.",
    },
  ],

  /**
   * Expert slot: a pastor or Bible teacher talking about the format only.
   * A placeholder until a real, consenting person is found; never invented.
   */
  expert: {
    name: "Name to be confirmed",
    role: "Pastor or Bible teacher",
    quote:
      "The order is what I like: background first, then the text. One page, read before you open the book, answers the questions people are too shy to ask in a group.",
    image: "open-pages" as ImageId,
  },

  guarantee: {
    days: 30,
    title: "30-day guarantee",
    body: "Read with it for 30 days. If it isn't right for you, send it back for a full refund, even if you've written in it.",
    steps: [
      {
        title: "Message us",
        body: "Reply to your order email or use the contact form within 30 days of delivery.",
      },
      {
        title: "Send it back",
        body: "We email a prepaid return label. Notes in the margins are fine.",
      },
      {
        title: "Get your refund",
        body: "Your refund goes back to the original payment method once the parcel is scanned.",
      },
    ],
    status: "tbc" as ContentStatus,
  },

  shipping: {
    /** Standard shipping is free at or over this subtotal (applied in lib/cart.ts). */
    freeOver: 50,
    dispatch: "Ships in 1–2 business days",
    tracking: "Tracked delivery, with a link in your confirmation email",
    status: "tbc" as ContentStatus,
  },

  warranty: {
    title: "Damage-free promise",
    body: "If it arrives damaged, or a page is misprinted, we'll send a new one free.",
    status: "tbc" as ContentStatus,
  },

  support: {
    title: "Real people on email",
    body: "Questions before or after you buy: we reply within one business day.",
    status: "tbc" as ContentStatus,
  },

  /** Customer questions and the brand's answers. */
  qna: [
    {
      q: "Is the print big enough to read easily?",
      asker: "Barbara",
      date: "2026-10-20",
      a: "That's the number one complaint about guides like this, so it's the first thing we're changing: larger type, set so most people can read it without a magnifier. We'll publish the exact size once the printer confirms it.",
      status: "tbc" as ContentStatus,
    },
    {
      q: "Does it include the Apocrypha?",
      asker: "Teresa",
      date: "2026-10-11",
      a: "No. It covers the 66 books of the Protestant Bible, which Catholic and Orthodox Bibles also contain. A Catholic edition with the deuterocanonical books is something we're considering.",
    },
    {
      q: "Can I write in it?",
      asker: "Jamal",
      date: "2026-10-02",
      a: "Yes. Each book's page faces a page for your notes. Gel or fine-tip pens work best.",
    },
    {
      q: "Does it work with the NIV or ESV?",
      asker: "Kristen",
      date: "2026-09-21",
      a: "Yes, with any translation. The pages describe each book, not one translation's wording.",
    },
    {
      q: "Is it a devotional?",
      asker: "Gary",
      date: "2026-09-09",
      a: "Not exactly. It's the background you read before you open a book: who wrote it, when, why and to whom. Many people use it alongside a devotional or a reading plan.",
    },
    {
      q: "How should a small group use it?",
      asker: "Ruth",
      date: "2026-08-28",
      a: "Read the book's page together for the first ten minutes, then open your Bibles. Everyone starts with the same background, so the discussion goes further.",
    },
    {
      q: "Is it suitable for teenagers?",
      asker: "Daniel",
      date: "2026-08-14",
      a: "Yes. It's written in plain language. Younger teens may enjoy working through it with a parent.",
    },
    {
      q: "Who wrote the content?",
      asker: "Pam",
      date: "2026-07-30",
      a: "The pages on this site are samples written for the concept. Before launch, every page will be written or reviewed by a qualified Bible teacher, and we'll name them.",
      status: "tbc" as ContentStatus,
    },
  ],

  /** Customer photo wall: customer and lifestyle photos (competitor stand-ins). */
  ugc: [
    "customer-hand",
    "interior-exodus",
    "gallery-in-use",
    "flatlay-coffee",
    "interior-chronicles",
    "book-wood",
    "open-pages",
    "flatlay-autumn",
    "holding",
    "flatlay-orange",
    "product-angle",
    "product-front",
  ] as ImageId[],
};

export type Proof = typeof proof;

/** "4.8" */
export const ratingLabel = proof.rating.average.toFixed(1);
/** "1,284" */
export const ratingCount = proof.rating.count.toLocaleString("en-US");

/** Replace {rating}, {count}, {customers}, {days} and {free} in concept copy. */
export function fillProof(text: string) {
  return text
    .replaceAll("{rating}", ratingLabel)
    .replaceAll("{count}", ratingCount)
    .replaceAll("{customers}", proof.customers.value)
    .replaceAll("{days}", String(proof.guarantee.days))
    .replaceAll("{free}", `$${proof.shipping.freeOver}`);
}
