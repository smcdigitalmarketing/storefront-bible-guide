// PLACEHOLDER REVIEWS. We have no customers yet. Two kinds, both labelled on
// the page and all of them to be replaced with our own verified reviews
// before launch:
//
// - "adapted": public Loox reviews of the competitor's guide, lightly
//   rewritten (the original text is kept beside each one). About 1 in 5 of
//   the competitor's reviews say the print is too small; those aren't on the
//   wall, because our guide is meant to fix it (see product.ts).
// - "illustrative": written for the concept so the layouts, filters and
//   themes can be judged with every kind of review a real store gets,
//   including critical ones with a reply.
//
// Item reviews (group pack, highlighters and so on) are all illustrative.

import type { ProductId } from "./catalog";
import type { Review } from "./types";

export const ADAPTED_SOURCE =
  "Adapted from a competitor review (Loox, saintslabel.com)";
export const ILLUSTRATIVE_SOURCE =
  "Illustrative review written for this concept";
const sourceUrl =
  "https://saintslabel.com/products/bible-study-guide-journal-66-pages#looxReviews";

type Draft = Omit<
  Review,
  "kind" | "source" | "sourceUrl" | "featured" | "rating" | "photo"
> & { rating: number; photo?: string };

const adapted: Draft[] = [
  {
    id: "linda-w",
    name: "Linda W.",
    rating: 5,
    title: "Easy to use and very helpful",
    body: "I've really enjoyed my Bible study guide. It's easy to use and very helpful.",
    original:
      "I have really enjoyed my Bible Study Guide. It is easy to Use and very helpful.",
    date: "2026-10-24",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["clarity"],
    helpful: 22,
  },
  {
    id: "carol",
    name: "Carol N.",
    rating: 5,
    title: "A great overview before each book",
    body: "Easy, understandable history and context, down to who each letter was written to. A great overview to read before starting a new book of Scripture.",
    original:
      "Easy, understandable history, context, to whom the letter was written. Great overview to read before starting a new book of scripture.",
    date: "2026-10-21",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["context", "clarity"],
    helpful: 41,
  },
  {
    id: "vicki",
    name: "Vicki V.",
    rating: 5,
    title: "The setting helps so much",
    body: "A very good little book. Knowing the historical setting and the people involved helps so much in understanding the Bible.",
    original:
      "Very good little book. Knowing historical settings and people helps so much in understanding the Bible.",
    date: "2026-10-18",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["context"],
    helpful: 33,
  },
  {
    id: "cherri",
    name: "Cherri P.",
    rating: 5,
    title: "Keeps the timeline straight",
    body: "A good reference for keeping the historical perspective: the timeline, and what was happening when each book was written. Nicely presented and worth the cost.",
    original:
      "The Bible Study Guide is a good reference to stay in historical perspective and timeline and what was happening of major significance when each Book was written. It is very helpful and nicely presented. Totally worth the cost.",
    photo: "customer-hand",
    date: "2026-10-15",
    variant: { bundle: "one", colour: "black" },
    tags: ["context", "quality"],
    helpful: 27,
  },
  {
    id: "mona",
    name: "Mona W.",
    rating: 5,
    title: "Bought three, two as gifts",
    body: "I bought three, two of them as Christmas gifts. It's been very helpful in my women's group with each week's lesson.",
    original:
      "I love has helped me with my bible study and I bought 3, 2 for Christmas gifts. In my womens group very helpful with the lesson each week.",
    date: "2026-10-12",
    variant: { bundle: "three", colour: "saddle" },
    tags: ["group", "gift"],
    helpful: 38,
  },
  {
    id: "debbie",
    name: "Debbie W.",
    rating: 5,
    title: "One for me, two for my girls",
    body: "I've started mine and it's very useful. The other two are Christmas gifts for my daughter and granddaughter.",
    original:
      "I have started mine and it is very useful . The other two are Christmas gifts for my daughter and granddaughter.",
    date: "2026-10-09",
    variant: { bundle: "three", colour: "espresso" },
    tags: ["gift"],
    helpful: 19,
  },
  {
    id: "george",
    name: "George F.",
    rating: 5,
    title: "Helpful before a new book",
    body: "Very helpful when I'm preparing to study a new book of the Bible.",
    original: "Very helpful when preparing to b study a new book in the Bible!",
    date: "2026-10-05",
    variant: { bundle: "one", colour: "black" },
    tags: ["context", "daily"],
    helpful: 14,
  },
  {
    id: "sandra-h",
    name: "Sandra H.",
    rating: 5,
    title: "Shared it with my church circle",
    body: "It comes in handy before I read my Bible. I've shared it with others in my circle at church.",
    original:
      "Comes in handy before I read the bible. Ive shared with others in my circle at church.",
    date: "2026-10-01",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["group"],
    helpful: 17,
  },
  {
    id: "marilyn-a",
    name: "Marilyn A.",
    rating: 5,
    title: "My study group found it helpful",
    body: "I shared the information with my Bible study group, and they all found it very helpful.",
    original:
      "I shared the information with my Bible study group and they all thought it was very helpful. ...BUT some of the print is TINY and a little difficult to read.",
    date: "2026-09-27",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["group"],
    helpful: 24,
  },
  {
    id: "chere",
    name: "Chere S.",
    rating: 5,
    title: "Her friend wants one too",
    body: "I bought this for my sister, who goes to Bible study every week. She's really enjoying it, and now a friend from her class wants one too.",
    original:
      "I purchased this bible study guide for my sister. She goes to bible study every week. She is really enjoying it. She is learning so much more from the bible study guide than she is in class. Since she got one her friend that goes with her",
    date: "2026-09-24",
    variant: { bundle: "three", colour: "saddle" },
    tags: ["gift", "group"],
    helpful: 21,
  },
  {
    id: "ginger",
    name: "Ginger T.",
    rating: 5,
    title: "Gave one to a struggling friend",
    body: "Very helpful. I gave one to a friend who was struggling to understand the Bible.",
    original:
      "Very helpful, gave one to a friend struggling to understand the bible.",
    date: "2026-09-20",
    variant: { bundle: "three", colour: "black" },
    tags: ["gift", "clarity"],
    helpful: 16,
  },
  {
    id: "samreen",
    name: "Samreen J.",
    rating: 5,
    title: "Great for new believers",
    body: "A great journal for a new believer who wants an introduction to each book of the Bible.",
    original:
      "This is an awsome journal if someone is a new believer and wants to know details and introduction of each book of the Bible. This is the best option.",
    date: "2026-09-17",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["clarity"],
    helpful: 29,
  },
  {
    id: "chris-m",
    name: "Chris M.",
    rating: 5,
    title: "Each book's purpose, in one place",
    body: "It's very nice to have a summary of each book's purpose as a guide while I read through it.",
    original:
      "It's very nice to have summary of each book's purpose and a guide when reading through the book.",
    date: "2026-09-13",
    variant: { bundle: "one", colour: "black" },
    tags: ["context", "daily"],
    helpful: 12,
  },
  {
    id: "kimberly",
    name: "Kimberly M.",
    rating: 5,
    title: "Well laid out",
    body: "Well laid out and easy to follow. Very enjoyable and helpful.",
    original: "Well laid out. Easy to follow. Very enjoyable and helpful.",
    date: "2026-09-10",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["clarity", "quality"],
    helpful: 15,
  },
  {
    id: "trish",
    name: "Trish S.",
    rating: 5,
    title: "Context matters",
    body: "So informative. Context matters!",
    original: "So informative.  Context matter!",
    date: "2026-09-06",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["context"],
    helpful: 11,
  },
  {
    id: "lisa-m",
    name: "Lisa M.",
    rating: 5,
    title: "Enjoying working through it",
    body: "It's made the Bible much easier to understand. I'm enjoying working through it.",
    original:
      "Made the Bible much easier to understand. I am enjoying working through it. Thank you!",
    date: "2026-09-02",
    variant: { bundle: "one", colour: "black" },
    tags: ["clarity", "daily"],
    helpful: 18,
  },
  {
    id: "paula",
    name: "Paula C.",
    rating: 5,
    title: "Beautiful, and it arrived fast",
    body: "A beautiful book, and it arrived in record time.",
    original: "Beautiful book, received it in record time.",
    date: "2026-08-29",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["quality", "service"],
    helpful: 9,
  },
  {
    id: "bradley",
    name: "Bradley B.",
    rating: 5,
    title: "Easy to follow",
    body: "Quick shipping, and it's a great, easy-to-follow book.",
    original: "quick shipping and it's a great and easy to follow book",
    date: "2026-08-25",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["service", "clarity"],
    helpful: 8,
  },
  {
    id: "david-n",
    name: "David N.",
    rating: 5,
    title: "As described, shipped fast",
    body: "The book is as described, and it'll be very helpful in my Bible study. Fast shipping: I'll buy from them again.",
    original:
      "Book is as described in the ad.  It will be very helpful in my bible study.  Fast shipment, will buy from them again.  David Nelson",
    date: "2026-08-21",
    variant: { bundle: "one", colour: "black" },
    tags: ["service"],
    helpful: 10,
  },
  {
    id: "evalyn",
    name: "Evalyn J.",
    rating: 5,
    title: "Very much appreciated gifts",
    body: "I gave them as gifts, and they were very much appreciated.",
    original: "I gave them as gifts.  They were very much appreciated.",
    date: "2026-08-17",
    variant: { bundle: "five", colour: "saddle" },
    tags: ["gift"],
    helpful: 13,
  },
  {
    id: "thomas",
    name: "Thomas M.",
    rating: 5,
    title: "Well liked as a gift",
    body: "Bought it as a gift, and it was very well liked.",
    original: "Bought it as a gift. Was liked very well",
    date: "2026-08-13",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["gift"],
    helpful: 6,
  },
  {
    id: "suzy",
    name: "Suzy S.",
    rating: 5,
    title: "Christmas gifts sorted",
    body: "Bought several of these as Christmas gifts.",
    original: "Bought them for Christmas gifts.",
    date: "2026-08-09",
    variant: { bundle: "five", colour: "black" },
    tags: ["gift"],
    helpful: 7,
  },
  {
    id: "john-d",
    name: "John D.",
    rating: 5,
    title: "A setup that guides me",
    body: "A great setup to guide me as I work at understanding my Bible.",
    original: "Great setup to guide me on my journey to understand my bible.",
    date: "2026-08-05",
    variant: { bundle: "one", colour: "black" },
    tags: ["daily"],
    helpful: 9,
  },
  {
    id: "linda-g",
    name: "Linda G.",
    rating: 5,
    title: "A whole book on one page",
    body: "It's so good to have a whole book on one page.",
    original: "So great to have a whole book on 1 page",
    date: "2026-08-01",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["clarity"],
    helpful: 20,
  },
  {
    id: "terri",
    name: "Terri L.",
    rating: 5,
    title: "No need to look it up",
    body: "An excellent reference: the background is right there, so I don't have to look it up. Glad I bought it.",
    original:
      "Excellent for references you don't have to look up glad I bought it thanks.",
    date: "2026-07-27",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["context"],
    helpful: 8,
  },
  {
    id: "charles-u",
    name: "Charles U.",
    rating: 5,
    title: "My wife loved the depth",
    body: "My wife loved the depth of the study material.",
    original: "My wife loved the depth of the informative study material.",
    date: "2026-07-22",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["gift", "quality"],
    helpful: 7,
  },
  {
    id: "waverly",
    name: "Waverly H.",
    rating: 5,
    title: "Helps explain each book",
    body: "A great reference that helps explain the books of the Bible.",
    original: "Great reference and helps explain the books of the Bible!",
    date: "2026-07-18",
    variant: { bundle: "one", colour: "black" },
    tags: ["context"],
    helpful: 6,
  },
  {
    id: "robin",
    name: "Robin S.",
    rating: 5,
    title: "Slow to arrive, loved by all",
    body: "They took quite a while to arrive, but everyone I shared them with loves them.",
    original:
      "Took quite a while to get them but everyone loves them that I shared them with.",
    date: "2026-07-14",
    variant: { bundle: "five", colour: "espresso" },
    tags: ["service", "gift"],
    helpful: 15,
    reply:
      "Thank you, Robin, and sorry for the wait. We're planning 1–2 business day dispatch with tracking, and you can always reply to your order email for an update.",
  },
  {
    id: "joy",
    name: "Joy S.",
    rating: 5,
    title: "Plans my audio Bible listening",
    body: "It helps me plan which book to listen to next on my audio Bible.",
    original:
      "Although I need to use a magnifier it help in planning the use of my Audio Bible. thanks",
    date: "2026-07-10",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["daily"],
    helpful: 5,
  },
  {
    id: "sal",
    name: "Sal C.",
    rating: 5,
    title: "Part of every study session",
    body: "I really enjoy using this guide during my Bible study. A great product.",
    original:
      "I really enjoy utilizing this guide during my Bible studying!  Great product!!",
    date: "2026-07-06",
    variant: { bundle: "one", colour: "black" },
    tags: ["daily"],
    helpful: 6,
  },
  {
    id: "cathy",
    name: "Cathy Q.",
    rating: 5,
    title: "Ordered two more as gifts",
    body: "After I saw mine, I ordered two more as gifts. You won't be disappointed.",
    original:
      "I had been looking for one and I love telling you order one,you won't be disappointed.  After I  saw mine got 2 more for gifts.",
    date: "2026-07-02",
    variant: { bundle: "three", colour: "saddle" },
    tags: ["gift"],
    helpful: 11,
  },
];

const illustrative: Draft[] = [
  {
    id: "leviticus",
    name: "Hannah K.",
    rating: 5,
    title: "Leviticus finally made sense",
    body: "I've stalled in Leviticus three times. Reading the page first, knowing it was written to people learning how to live near a holy God, got me through it this time.",
    date: "2026-10-22",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["context", "daily"],
    helpful: 36,
  },
  {
    id: "group-ten",
    name: "Marcus T.",
    rating: 5,
    title: "Ten minutes that change the discussion",
    body: "We read the page together at the start of every session. Ten minutes in, everyone's on the same page, literally, and the questions are better.",
    date: "2026-10-16",
    variant: { bundle: "five", colour: "black" },
    tags: ["group"],
    helpful: 31,
  },
  {
    id: "catholic",
    name: "Teresa M.",
    rating: 4,
    title: "Hoping for a Catholic edition",
    body: "Very helpful for the books it covers. I'd love an edition with Tobit, Judith and the others for our parish group.",
    date: "2026-10-07",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["group", "context"],
    helpful: 24,
    reply:
      "Thank you, Teresa. A Catholic edition is on our list, and we'll share news here when we know more.",
  },
  {
    id: "grandkids",
    name: "Ellen R.",
    rating: 5,
    title: "One for each grandchild",
    body: "I gave one to each grandchild heading off to college, with a note written on the facing page for Genesis.",
    date: "2026-09-30",
    variant: { bundle: "five", colour: "saddle" },
    tags: ["gift"],
    helpful: 22,
  },
  {
    id: "tight",
    name: "Mark L.",
    rating: 3,
    title: "Long books feel squeezed",
    body: "The longer books, like Psalms and Isaiah, have a lot packed onto one page. I'd happily take two pages for those.",
    date: "2026-09-19",
    variant: { bundle: "one", colour: "black" },
    tags: ["quality", "clarity"],
    helpful: 27,
    reply:
      "That's a fair point, Mark. One page per book is the design, but we're testing whether the longest books need a second page.",
  },
  {
    id: "plan",
    name: "Grace O.",
    rating: 5,
    title: "The reading plan got us started",
    body: "The 30-day plan that came with the three-pack got my husband and me reading together every evening.",
    date: "2026-09-12",
    variant: { bundle: "three", colour: "espresso" },
    tags: ["daily", "gift"],
    helpful: 18,
  },
  {
    id: "new-believer",
    name: "Andre W.",
    rating: 5,
    title: "I stopped feeling lost",
    body: "I came to faith last year and had no idea where to start. The pages told me what each book is for and who it was written to.",
    date: "2026-09-04",
    variant: { bundle: "one", colour: "black" },
    tags: ["clarity"],
    helpful: 33,
  },
  {
    id: "marks",
    name: "Jo P.",
    rating: 4,
    title: "Cover picked up a mark",
    body: "I love the guide. The faux leather picked up a mark from my bag, so I keep it in a pouch now.",
    date: "2026-08-24",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["quality"],
    helpful: 12,
    reply:
      "Thanks, Jo. A soft, dry cloth usually lifts marks. If it doesn't, message us and we'll help.",
  },
  {
    id: "youth",
    name: "Sam B.",
    rating: 5,
    title: "Teenagers actually read one page",
    body: "I use the pages to plan our youth group nights. One page is something teenagers will actually read before we open the Bible.",
    date: "2026-08-11",
    variant: { bundle: "three", colour: "black" },
    tags: ["group"],
    helpful: 16,
  },
  {
    id: "same-layout",
    name: "Priya D.",
    rating: 5,
    title: "Same layout, every book",
    body: "Once you've used one page, you can use them all. That consistency is what got me reading most days.",
    date: "2026-07-28",
    variant: { bundle: "one", colour: "espresso" },
    tags: ["daily", "clarity"],
    helpful: 14,
  },
  {
    id: "dented",
    name: "Ron F.",
    rating: 2,
    title: "Arrived with a dented corner",
    body: "The guide is fine, but the corner of the cover was dented when it arrived. It was a gift, so that was disappointing.",
    date: "2026-07-16",
    variant: { bundle: "one", colour: "saddle" },
    tags: ["service", "quality"],
    helpful: 10,
    reply:
      "Sorry, Ron. That shouldn't happen. Reply to your order email with a photo and we'll send a new one straight away.",
  },
  {
    id: "five-pack",
    name: "Lauren E.",
    rating: 5,
    title: "The five-pack covered our group",
    body: "The five-pack covered our whole group. Black for the leaders, saddle for everyone else.",
    date: "2026-07-04",
    variant: { bundle: "five", colour: "black" },
    tags: ["group", "gift"],
    helpful: 13,
  },
];

/** Reviews of the other catalogue items (all illustrative). */
const items: (Draft & { product: ProductId })[] = [
  {
    id: "pack-1",
    product: "leader-pack",
    name: "Dana K.",
    rating: 5,
    title: "Everything we needed to start",
    body: "Five guides and six ready sessions. We started the week it arrived.",
    date: "2026-10-06",
    tags: ["group"],
    helpful: 9,
  },
  {
    id: "pack-2",
    product: "leader-pack",
    name: "Mike S.",
    rating: 5,
    title: "The leader notes are short and useful",
    body: "Each session fits in an hour, and the three questions get people talking.",
    date: "2026-09-15",
    tags: ["group"],
    helpful: 6,
  },
  {
    id: "pack-3",
    product: "leader-pack",
    name: "Dana W.",
    rating: 4,
    title: "Wish we could mix colours",
    body: "Great pack. I'd have liked to mix cover colours, so I bought the five-guide bundle for our second group.",
    date: "2026-08-20",
    tags: ["group"],
    helpful: 4,
  },
  {
    id: "hl-1",
    product: "highlighters",
    name: "Bethany L.",
    rating: 5,
    title: "No bleed-through in my Bible",
    body: "The gel highlighters don't soak through my thin Bible pages. Colour-coding promises and commands has been fun.",
    date: "2026-09-27",
    tags: ["quality"],
    helpful: 8,
  },
  {
    id: "hl-2",
    product: "highlighters",
    name: "Carlos M.",
    rating: 4,
    title: "Good set, one pen ran dry fast",
    body: "Great colours. One of the fine-tip pens ran out sooner than I expected.",
    date: "2026-08-03",
    tags: ["quality"],
    helpful: 3,
    reply: "Thanks, Carlos. Message us and we'll send a replacement pen.",
  },
  {
    id: "vc-1",
    product: "verse-cards",
    name: "Ruth A.",
    rating: 5,
    title: "One verse a week, on the fridge",
    body: "We swap the card every Sunday. The context on the back helps the kids remember where it comes from.",
    date: "2026-09-08",
    tags: ["daily"],
    helpful: 5,
  },
  {
    id: "vc-2",
    product: "verse-cards",
    name: "Owen G.",
    rating: 5,
    title: "Pocket-sized and sturdy",
    body: "I carry one in my wallet all week. They've held up well.",
    date: "2026-07-19",
    tags: ["quality"],
    helpful: 2,
  },
  {
    id: "gc-1",
    product: "gift-card",
    name: "Joanne P.",
    rating: 5,
    title: "Let her choose the cover",
    body: "I couldn't decide on a colour for my mother, so a gift card let her choose.",
    date: "2026-10-03",
    tags: ["gift"],
    helpful: 3,
  },
  {
    id: "gc-2",
    product: "gift-card",
    name: "Peter N.",
    rating: 5,
    title: "An easy gift for our pastor's family",
    body: "We sent a gift card so they could pick a group pack.",
    date: "2026-08-27",
    tags: ["gift"],
    helpful: 2,
  },
];

function finish(draft: Draft, kind: Review["kind"]): Review {
  return {
    ...draft,
    rating: draft.rating as Review["rating"],
    photo: draft.photo as Review["photo"],
    kind,
    source: kind === "adapted" ? ADAPTED_SOURCE : ILLUSTRATIVE_SOURCE,
    sourceUrl: kind === "adapted" ? sourceUrl : undefined,
    // Critical reviews stay on the wall (with a reply) but are never chosen
    // for a highlight slot.
    featured: draft.rating >= 4,
  };
}

export const reviews: Review[] = [
  ...adapted.map((r) => finish(r, "adapted")),
  ...illustrative.map((r) => finish(r, "illustrative")),
  ...items.map((r) => finish(r, "illustrative")),
];

export function getReview(id: string) {
  const review = reviews.find((r) => r.id === id);
  if (!review) throw new Error(`Unknown review ${id}`);
  return review;
}

/** Every review of a product, newest first. */
export function reviewsFor(product: ProductId) {
  return reviews
    .filter((r) => (r.product ?? "guide") === product)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export type ReviewSort =
  "relevant" | "recent" | "highest" | "lowest" | "photos";

export const REVIEW_SORTS: { id: ReviewSort; label: string }[] = [
  { id: "relevant", label: "Most relevant" },
  { id: "recent", label: "Most recent" },
  { id: "photos", label: "With photos first" },
  { id: "highest", label: "Highest rated" },
  { id: "lowest", label: "Lowest rated" },
];

/** "Most relevant" puts photo reviews first, then the most helpful. */
export function sortReviews(list: Review[], sort: ReviewSort) {
  const byDate = (a: Review, b: Review) => b.date.localeCompare(a.date);
  const sorted = [...list];
  if (sort === "recent") return sorted.sort(byDate);
  if (sort === "highest")
    return sorted.sort((a, b) => b.rating - a.rating || byDate(a, b));
  if (sort === "lowest")
    return sorted.sort((a, b) => a.rating - b.rating || byDate(a, b));
  if (sort === "photos")
    return sorted.sort(
      (a, b) => Number(!!b.photo) - Number(!!a.photo) || byDate(a, b),
    );
  return sorted.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      Number(!!b.photo) - Number(!!a.photo) ||
      b.helpful - a.helpful,
  );
}

export const productReviews = reviewsFor("guide");
export const photoReviews = sortReviews(
  productReviews.filter((r) => r.photo),
  "relevant",
);
const relevant = sortReviews(productReviews, "relevant");

/** Homepage and hub highlights: photo reviews first. */
export const wallReviews = relevant.slice(0, 8);

/** Section 7 "final stories": six with titles the first page of the wall leaves out. */
export const closingReviews = relevant
  .slice(12)
  .filter((r) => r.featured && r.body.length > 90)
  .slice(0, 6);

/** "Mar 3, 2026". UTC so prerendered HTML matches the browser. */
export function formatReviewDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
