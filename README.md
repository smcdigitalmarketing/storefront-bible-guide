# Lamplight storefront

The Shopify Hydrogen storefront on Oxygen for the Lamplight Bible study guide and journal. The brand direction (copy, palette, fonts, layout) comes from the retro-camera `apps/bible-guide`, concept `lamplight` mock store. It's built from Shopify's
[Hydrogen React Router template](https://github.com/Shopify/hydrogen/tree/main/templates/react-router)
(React Router 7 in framework mode with SSR, plus Vite and Mini Oxygen), and every
piece of UI is restyled with [shadcn/ui](https://ui.shadcn.com) on Tailwind CSS v4.

## Pages

- `/`: the Lamplight home (full-bleed hero, trust, the drawn guide, "Inside the guide" with a sample page and the 66-book index, reviews, story, newsletter)
- `/products/lamplight-bible-guide`: the SOP product page. Seven sections in a fixed order:
  - above the fold, with the 8-slide gallery and the drawn 3D guide
  - buy box (3 bundles as stacked rows, a cover per guide, Look inside)
  - under the button
  - details, with "All 66 books"
  - social proof
  - value props
  - closing
  - plus a sticky add-to-cart bar
- `/products/:handle`: every other product (gallery, variants, add to cart, Shop Pay)
- `/about`, `/how-it-works`, `/faq`, `/contact`, `/policies/:policy`
- `/journal` and `/journal/:slug`: the advertorial and the reading guide
- `/collections` and `/collections/:handle`: collections, with filters, sort and
  pagination
- `/search`: product search, also the no-JS fallback for the search drawer
- `/cart`: cart page, also the no-JS fallback for the cart drawer
- `/account`: Customer Account sign-in, log out and order history

## Run it

Node.js 22 (22.12 or later) or 24.

```bash
npm install
npx shopify hydrogen link       # once: connect this folder to the store's Hydrogen storefront
npx shopify hydrogen env pull   # writes the storefront's variables to .env
npm run dev                     # http://localhost:5173
```

- **No store linked yet?** Without a private Storefront API token, the app shows
  [mock.shop](https://mock.shop) demo data. You can force this with `MOCK_SHOP=1`
  in `.env`.
- **On Oxygen,** the linked storefront injects `PUBLIC_STORE_DOMAIN`,
  `PUBLIC_STOREFRONT_ID` and `PRIVATE_STOREFRONT_API_TOKEN` itself.
- **Customer Account sign-in needs trusted local HTTPS.** Run `npm run dev:https`
  and open <https://local.tryhydrogen.dev:5173>.

## Before the store exists: the mock.shop stand-in

No Shopify store is linked yet, so development runs on mock.shop. [LAUNCH.md](LAUNCH.md) is the checklist for moving to a real store and opening it: the Shopify setup, the product's handle and options, bundle pricing, the code still to wire, and the content to confirm.

- **The catalog** is Paper Haven Books (`books.mock.shop`), the default store in `app/lib/shop.ts`. `PUBLIC_STORE_DOMAIN` overrides it.
- **The SOP product page** is `/products/lamplight-bible-guide` (`app/routes/hero-product.tsx`).
  - In mock mode, its variants come from the `hardcover-the-annotated-journey` product, whose `Format` option has three values.
  - They map to our covers (Hardcover is Saddle, Paperback is Walnut, Digital is Ebony). See `app/content/hero-product.ts`.
  - So the page shows the guide and brand names, while the cart holds real mock.shop variants at mock.shop prices.
- **Once the store is linked,** the same route reads the real `lamplight-bible-guide` product. Its `Color` values must be the cover names in `brand.store.colourNames` (Saddle, Walnut, Ebony). No code changes are needed.
- **mock.shop has no** metafields, metaobjects, bundles or discounts. The cart therefore shows unit prices without bundle savings, and accessories can't be added yet.
- **Running more than one storefront locally:** every storefront on `localhost` shares Hydrogen's `cart` cookie, whatever the port. After using another one, its cart doesn't exist in this store and adds fail with "The specified cart does not exist". Clear the `cart` cookie for `localhost`.

## The drawn guide

There is no photography of our own guide yet, so it is drawn in code (`app/components/book/`):

- **`BookCover`** is a 3D book built from Tailwind's 3D utilities, in the chosen leather (the cover colour's light and dark pair from `catalog.ts`). It turns by drag or arrow keys, and sways gently until touched. Under reduced motion it stays still.
- **`SamplePage`**, **Look inside** (a Dialog) and **`PageFlip`** show the four sample pages from `books.ts`; **`BookIndex`** lists all 66 books.
- The cover design is a concept proposal until a supplier proof exists. The photos in `public/images/guide` are competitor stand-ins showing the competitor's cover, labelled where shown.

## Offers

The store runs one offer at a time:

- `PUBLIC_ACTIVE_OFFER` holds an offer id from `app/content/offers.ts`: `standard` (the default) or `early-black-friday`.
- In development, add `?offer=early-black-friday` to a URL to preview that offer on that page.
- **Prices, bundles and gifts** come from `app/content/offers.ts` and are labelled illustrative. The gifts are digital downloads.
- **Bundles** add one cart line per cover, tagged with hidden `_bundle` and `_offer` line attributes (`app/lib/bundle-cart.ts`).

## Content

The brand's copy and placeholder proof are typed files in `app/content/`, ported from the retro-camera mock (`apps/bible-guide`, concept `lamplight`) with the same field names:

| File                     | Holds                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `brand.ts`               | Brand copy, product page copy, the advertorial, store page copy, cover and bundle names                        |
| `product.ts`             | Facts (each with a status), what's included, how it works, the comparison, stats, FAQ, policies summary        |
| `catalog.ts`             | Covers (swatch and leather pair), the accessories                                                              |
| `books.ts`               | The 66 books in canon order, their sections and counts, the four sample pages                                  |
| `scripture.ts`           | Every verse the site quotes, King James Version only                                                           |
| `offers.ts`              | Bundles, prices, compare-at and gifts for each offer                                                           |
| `proof.ts`, `reviews.ts` | The rating, reviews, Q&A, press, expert, guarantee and shipping terms. All placeholders, labelled on the page. |
| `store-pages.ts`         | FAQ categories, policies, the reading guide steps                                                              |
| `images.ts`              | The image registry. Every image is a competitor stand-in for now, labelled where shown.                        |

Anything not confirmed carries a `PlaceholderTag` (a dashed badge) on the page.

**Scripture and honesty rules.** `npm run check:content` fails when:

- a quoted verse (a `data-verse` figure) doesn't show "(KJV)", or a copyrighted translation (NIV, ESV, NLT, NKJV, CSB, NASB, MSG) appears
- the advertorial loses its labelled pastor slot. No pastor or scholar is invented.
- visible text has pastor endorsements, a named pastor, promised outcomes ("guaranteed to", "will transform", "closer to God"), fake urgency, sales counts or the competitor's names
- the index on `/how-it-works` doesn't list 66 books

## Open decisions

Each of these is a step in [LAUNCH.md](LAUNCH.md).

- **Bundle pricing:** Shopify automatic discounts or Shopify Bundles. This needs the store.
- **Gifts:** how the digital downloads (reading plan, group guide, verse printables) are delivered.
- **Reviews:** a reviews provider to replace the placeholder rating, reviews and Q&A.
- **Imagery:** a photo shoot of our own guide, and a supplier proof of the cover design.
- **Specs:** binding, paper and page count, still "to be confirmed".
- **Policies:** shipping, the free-shipping threshold, returns and the guarantee.
- **Content editing:** whether copy moves from `app/content/` to Shopify metaobjects so the team can edit it.

## Deploy

Pushing to `main` deploys through the GitHub Actions workflow that the Hydrogen
channel adds (`.github/workflows/oxygen-deployment-*.yml`) once the storefront is
created ([LAUNCH.md](LAUNCH.md), step 1):

- `main` goes to the production environment.
- Other branches get preview deployments.

Oxygen environments on a development store are private. To share one, use
**Share deployment** in the Hydrogen channel.

## Styling

shadcn/ui is the source of styling truth. The full rules are in
[AGENTS.md](./AGENTS.md#styling-rules). In short:

- **The theme lives in `app/app.css`:** shadcn's CSS variables, and nothing else.
  The brand's colours, radius and fonts are set there.
- **`app/components/ui/` holds the shadcn components.** Add more from outside the
  repo, so the CLI doesn't pick up the local `shadcn` package:
  `npx shadcn@latest add -c <path-to-repo> <component>`.
- **Feature components compose shadcn components.** They use Tailwind utilities for
  layout and theme tokens for colour (`text-muted-foreground`, `bg-primary`).
- **No other CSS, inline styles, native form or overlay elements, or raw colours.**
  `npm run check:styles` enforces this.

## Scripts

| Script                  | Does                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`           | Start the Vite dev server with Mini Oxygen.                                                                                                                  |
| `npm run dev:https`     | Start the dev server with trusted local HTTPS.                                                                                                               |
| `npm run build`         | Production React Router build for Oxygen.                                                                                                                    |
| `npm run preview`       | Build and preview locally with Vite and Mini Oxygen.                                                                                                         |
| `npm run deploy`        | Deploy to Oxygen with the Shopify CLI.                                                                                                                       |
| `npm run typecheck`     | React Router typegen, TypeScript and Hydrogen GraphQL checks.                                                                                                |
| `npm run check:styles`  | Fail on any styling that doesn't come from shadcn/ui.                                                                                                        |
| `npm run check:content` | Check a running server's pages: SOP order, bundles, placeholder labels, scripture (KJV only) and the honesty lint (`BASE`, default `http://localhost:3103`). |

## Where things live

| What                                           | Where                                |
| ---------------------------------------------- | ------------------------------------ |
| Routes                                         | `app/routes/`                        |
| Shared UI built from shadcn components         | `app/components/`                    |
| shadcn components (generated, owned by us)     | `app/components/ui/`                 |
| Theme (shadcn variables, brand colours, fonts) | `app/app.css`                        |
| Data, queries and helpers                      | `app/lib/`                           |
| Which drawer (Sheet) is open                   | `app/lib/cart-drawer.ts`             |
| Announcement bar entries                       | `app/components/AnnouncementBar.tsx` |

## License

MIT, from Shopify's template. See [LICENSE](./LICENSE).
