// Product facts shared by every concept. Nothing here has been confirmed by
// Russ or a printer yet. Physical facts come from the competitor's listing of
// what appears to be the same journal (sold on marketplaces for about $13);
// the page content is ours to write. Anything we plan to change, such as the
// type size, is labelled "to be confirmed".

import type { Fact, FaqItem, Step } from "./types";

const LISTING = "saintslabel.com product listing and photos, 28 Oct 2026";

export const product = {
  category: "Bible study guide and journal",
  /** Facts we are comfortable showing (labelled until confirmed). */
  facts: {
    format: {
      label: "Format",
      value: "A5 hardcover, 5.5 × 8.3 in",
      status: "competitor-listed",
      source: LISTING,
    },
    cover: {
      label: "Cover",
      value: "Faux (PU) leather with a debossed title and a ribbon marker",
      status: "competitor-listed",
      source: LISTING,
    },
    pages: {
      label: "Pages",
      value:
        "66 guide pages, one for every book of the Bible, each facing a page for notes",
      status: "competitor-listed",
      source: LISTING,
    },
    type: {
      label: "Print size",
      value:
        "Larger than the competitor's, readable without a magnifier. Exact size to be confirmed with the printer",
      status: "tbc",
      note: "About 1 in 5 of the competitor's reviews mention small print (15 of 78 read).",
    },
    canon: {
      label: "Books covered",
      value:
        "The 66 books of the Protestant Bible: 39 Old Testament, 27 New Testament",
      status: "tbc",
    },
    translation: {
      label: "Translation",
      value: "Works with any. Quoted verses are King James Version",
      status: "tbc",
    },
    paper: {
      label: "Paper",
      value: "To be confirmed with the printer",
      status: "tbc",
    },
  } satisfies Record<string, Fact>,

  /** What comes in the box. Packaging not yet designed. */
  included: [
    { name: "The guide", detail: "66 pages, one per book of the Bible" },
    { name: "Ribbon marker", detail: "Sewn into the spine" },
    { name: "Quick-start card", detail: "How to use a page in five minutes" },
  ],

  howItWorks: [
    {
      title: "Read the page",
      body: "Five minutes on who wrote the book, when, why and to whom.",
      image: "interior-exodus",
    },
    {
      title: "Open your Bible",
      body: "Read the book, or tonight's chapter, with the outline beside you.",
      image: "flatlay-coffee",
    },
    {
      title: "Write it down",
      body: "Use the facing page for questions, verses and prayers.",
      image: "interior-chronicles",
    },
    {
      title: "Take one step",
      body: "Every page ends with one truth to keep and one thing to do this week.",
      image: "customer-hand",
    },
  ] satisfies Step[],

  /** Rows for the us-vs-alternatives table. Criteria chosen by us. */
  comparison: {
    columns: ["This guide", "Study Bible", "Commentary", "Blank journal"],
    rows: [
      {
        label: "Works with the Bible you own",
        values: ["Yes, any translation", "It is a Bible", "Yes", "Yes"],
      },
      {
        label: "Background for all 66 books",
        values: [
          "One page each",
          "Book introductions",
          "Usually one book per volume",
          "No",
        ],
      },
      {
        label: "Same layout for every book",
        values: ["Yes", "Varies", "Varies", "No"],
      },
      {
        label: "Room to write beside each book",
        values: ["A facing note page", "Margins", "No", "Blank pages"],
      },
      {
        label: "Carry it to church or group",
        values: ["A5, one slim book", "Often large", "Varies", "Yes"],
      },
    ],
  },

  /** Stats band. Every number is a fact about the format, not an outcome. */
  stats: [
    { value: "66", label: "books, one page each" },
    { value: "5 min", label: "to read a page" },
    { value: "39 + 27", label: "Old and New Testament books" },
    { value: "1 + 1", label: "truth and step on every page" },
  ],

  /** Grouped on the page under each item's category, in this order. */
  faq: [
    {
      category: "The guide",
      q: "What exactly is it?",
      a: "A hardcover guide with one page for every book of the Bible: who wrote it, when and why, who it was written to, an outline, the key themes, what to look for, and one truth and one step to take with you. It isn't a Bible, a devotional or a commentary. It's the background you read before you open a book.",
    },
    {
      category: "The guide",
      q: "Which Bible translation does it work with?",
      a: "Any. The pages describe each book rather than one translation's wording. Where we quote a verse, we use the King James Version, which is in the public domain.",
    },
    {
      category: "The guide",
      q: "Does it cover Catholic Bibles?",
      a: "It covers the 66 books found in Protestant Bibles, which Catholic and Orthodox Bibles also contain. It doesn't cover the deuterocanonical books, such as Tobit or 1 Maccabees. A Catholic edition is something we're considering.",
      status: "tbc",
    },
    {
      category: "The guide",
      q: "Who writes the pages?",
      a: "The sample pages on this site were written for this concept. Before launch, every page will be written or reviewed by a qualified Bible teacher, and we'll name them here.",
      status: "tbc",
    },
    {
      category: "The guide",
      q: "How big is the print?",
      a: "Bigger than the competitor's. Small print is the most common complaint about guides like this, so we're setting the type at a size most people can read without a magnifier. We'll publish the exact size once the printer confirms it.",
      status: "tbc",
    },
    {
      category: "Using it",
      q: "How long does a page take?",
      a: "About five minutes. Read it before you start a book, then keep it open beside your Bible as you read.",
    },
    {
      category: "Using it",
      q: "Do I have to go in order?",
      a: "No. Start with whatever you're reading now, at church, in your group or on your own.",
    },
    {
      category: "Using it",
      q: "Is it good for new believers?",
      a: "Yes. It's written in plain language with no seminary terms, and every page follows the same layout, so once you've used one, you can use them all.",
    },
    {
      category: "Using it",
      q: "Can we use it as a small group?",
      a: "Yes. Everyone reads the same page before the study, so the whole group starts from the same background. The five-guide bundle and the group pack are made for this.",
    },
    {
      category: "Shipping and returns",
      q: "How much is shipping, and how fast is it?",
      a: "Standard shipping is free on orders over $50 (so three guides ship free), and orders ship in 1–2 business days with tracking. Express is available at checkout.",
      status: "tbc",
    },
    {
      category: "Shipping and returns",
      q: "What's your returns policy?",
      a: "If it isn't right for you, send it back within 30 days of delivery for a full refund, even if you've written in it.",
      status: "tbc",
    },
    {
      category: "Gifting",
      q: "Is it a good gift?",
      a: "Many people buy guides like this as gifts: for a new believer, a graduate, a small-group leader or a grandparent. The three- and five-guide bundles cost less per guide.",
    },
    {
      category: "Gifting",
      q: "Can I ship it straight to someone else?",
      a: "Yes. Enter their address at checkout. Packing slips won't show prices.",
      status: "tbc",
    },
    {
      category: "Gifting",
      q: "Do you sell gift cards?",
      a: "Yes, in $25, $50 and $100. They're digital, sent by email, so they can choose their own cover.",
    },
  ] satisfies FaqItem[],

  /** Materials and care, shown in the details accordion. */
  materials: [
    {
      label: "Cover",
      value: "Faux (PU) leather over board, with a debossed title",
      status: "competitor-listed",
      source: LISTING,
    },
    {
      label: "Binding",
      value: "To be confirmed with the printer",
      status: "tbc",
    },
    {
      label: "Paper",
      value: "To be confirmed: heavy enough that gel pens don't show through",
      status: "tbc",
    },
  ] satisfies Fact[],

  care: [
    "Wipe the cover with a soft, dry cloth.",
    "Keep it out of hot cars and direct sun: faux leather can soften.",
    "Use gel or fine-tip pens on the note pages to avoid bleed-through.",
    "Store it flat or upright, not open face-down.",
  ],

  /** How to get the most from a page, shown under "Using it". */
  tips: [
    "Read the page before you start a book, not after.",
    "Keep the guide open beside your Bible as you read.",
    "Write questions on the facing page as they come up, and bring them to your group.",
    "Come back to the one step at the end of the week.",
  ],

  /** Feature pins over a sample page (John), as percentages of the page. */
  callouts: [
    {
      title: "Where it sits",
      body: "Its place among the 66 books, and its section.",
      x: 93,
      y: 6,
    },
    {
      title: "The snapshot",
      body: "Who wrote it, when, to whom and where.",
      x: 93,
      y: 23,
    },
    {
      title: "The outline",
      body: "The whole book in four or five movements.",
      x: 93,
      y: 38,
    },
    {
      title: "Key themes",
      body: "What the book keeps coming back to.",
      x: 93,
      y: 52,
    },
    {
      title: "Look for",
      body: "Details that are easy to miss on your own.",
      x: 93,
      y: 64,
    },
    {
      title: "The big idea",
      body: "The book in one sentence.",
      x: 93,
      y: 75,
    },
    {
      title: "One truth, one step",
      body: "Something to keep, and something to do this week.",
      x: 93,
      y: 85,
    },
  ],

  policies: {
    shipping: {
      title: "Shipping",
      body: "Free standard shipping over $50, so three guides ship free. Orders ship in 1–2 business days with tracking; express is available at checkout.",
      status: "tbc",
    },
    returns: {
      title: "Returns",
      body: "30 days from delivery for a full refund, even if you've written in it. We send a prepaid label.",
      status: "tbc",
    },
    guarantee: {
      title: "Guarantee",
      body: "30-day guarantee, plus a free replacement if it arrives damaged or a page is misprinted. Proposed terms: Russ to confirm before launch.",
      status: "tbc",
    },
  },
} as const;

export type ProductFacts = typeof product;
