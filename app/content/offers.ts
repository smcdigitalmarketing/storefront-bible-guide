// Commercial terms for the two offer presentations. ALL NUMBERS ARE
// ILLUSTRATIVE: they sit below the competitor's public pricing ($39.99 a
// guide with a $60 compare-at, and buy-2-get-1 and buy-3-get-2 bundles, on
// 28 Oct 2026) so the pages read realistically, but no price, discount,
// bundle or gift has been approved. Change them here; no component hard-codes
// a price. The gifts are digital downloads; their values are illustrative.

import type { Bundle, BundleId, Gift, GiftId, Offer, OfferId } from "./types";

export const gifts: Record<GiftId, Gift> = {
  "reading-plan": {
    id: "reading-plan",
    name: "30-day reading plan (digital)",
    value: 9.99,
    image: "interior-exodus",
  },
  "group-guide": {
    id: "group-guide",
    name: "Small-group discussion guide (digital)",
    value: 12.99,
    image: "interior-chronicles",
  },
  "verse-printables": {
    id: "verse-printables",
    name: "Printable verse cards (digital)",
    value: 6.99,
    image: "flatlay-autumn",
  },
};

export const offers: Record<OfferId, Offer> = {
  standard: {
    id: "standard",
    name: "Standard",
    illustrative: true,
    defaultBundle: "three",
    bundles: [
      { id: "one", quantity: 1, price: 34.99, compareAt: 60, gifts: [] },
      {
        id: "three",
        quantity: 3,
        price: 69.98,
        compareAt: 180,
        gifts: ["reading-plan"],
        badge: "Most gifted",
      },
      {
        id: "five",
        quantity: 5,
        price: 104.97,
        compareAt: 300,
        gifts: ["reading-plan", "group-guide"],
        badge: "Best for groups",
      },
    ],
  },
  "early-black-friday": {
    id: "early-black-friday",
    name: "Early Black Friday",
    illustrative: true,
    defaultBundle: "three",
    bundles: [
      {
        id: "one",
        quantity: 1,
        price: 29.99,
        compareAt: 60,
        gifts: ["reading-plan"],
      },
      {
        id: "three",
        quantity: 3,
        price: 59.98,
        compareAt: 180,
        gifts: ["reading-plan", "verse-printables"],
        badge: "Most gifted",
      },
      {
        id: "five",
        quantity: 5,
        price: 89.97,
        compareAt: 300,
        gifts: ["reading-plan", "group-guide", "verse-printables"],
        badge: "Best for groups",
      },
    ],
  },
};

export const offerIds = Object.keys(offers) as OfferId[];

export function isOfferId(value: string | undefined): value is OfferId {
  return !!value && value in offers;
}

export function getBundle(offer: Offer, id: BundleId) {
  return offer.bundles.find((b) => b.id === id) ?? offer.bundles[0];
}

const round = (n: number) => Math.round(n * 100) / 100;

export function pricing(bundle: Bundle) {
  const giftValue = round(
    bundle.gifts.reduce((sum, id) => sum + gifts[id].value, 0),
  );
  return {
    total: bundle.price,
    compareAt: bundle.compareAt,
    saving: round(bundle.compareAt - bundle.price),
    perUnit: round(bundle.price / bundle.quantity),
    giftValue,
  };
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
