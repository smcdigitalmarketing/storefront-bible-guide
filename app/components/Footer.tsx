import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { brand } from "~/content/brand";
import type { StorefrontShop } from "~/lib/storefront-shop";
import { cn } from "~/lib/utils";

import { PaymentMethodIcon } from "./PaymentMethodIcon";
import { POLICY_ITEMS, storePaths, type NavItem } from "./store/nav";
import { Wordmark } from "./store/Wordmark";

// The brand's footer columns, from the mock's StoreFooter.
const FOOTER_COLUMNS: { id: string; title: string; links: NavItem[] }[] = [
  {
    id: "shop",
    title: brand.store.nav.shop,
    links: [
      { to: storePaths.product, label: brand.store.products.guide.name },
      { to: storePaths.shop, label: "All collections" },
    ],
  },
  {
    id: "customer-care",
    title: "Help",
    links: [
      { to: storePaths.how, label: brand.store.nav.how },
      { to: storePaths.faq, label: "FAQ" },
      { to: storePaths.contact, label: "Contact" },
      { to: storePaths.search, label: "Search" },
      { to: storePaths.account, label: "Account" },
    ],
  },
  {
    id: "brand",
    title: brand.name,
    links: [
      { to: storePaths.about, label: brand.store.nav.about },
      { to: storePaths.journal, label: brand.store.nav.journal },
    ],
  },
];

/** Small caps in bright foil gold: the gold-leaf label colour is for light grounds. */
const COLUMN_TITLE =
  "font-heading text-foil mb-3 text-xs font-medium tracking-[0.12em] uppercase";

function FooterLinks({ links }: { links: NavItem[] }) {
  return (
    <ul role="list" className="flex flex-col">
      {links.map((link) => (
        <li key={link.to}>
          <Button
            asChild
            variant="link"
            className="text-background/80 hover:text-background h-10 px-0 font-normal"
          >
            <Link to={link.to}>{link.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}

/** Lamplight's footer: parchment type on ink, with thin rules. */
export function Footer({ shopInfo }: { shopInfo: StorefrontShop }) {
  const hasPaymentMethods = shopInfo.paymentMethods.length > 0;

  return (
    <footer className="bg-foreground text-background">
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 text-sm sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]",
          hasPaymentMethods && "xl:grid-cols-[1.4fr_repeat(4,1fr)]",
        )}
      >
        <div className="min-w-0 space-y-4 wrap-anywhere">
          <h2>
            {/* The wordmark's oxblood name and gold-leaf lamp are set for
                parchment, so on ink they take parchment and foil gold. */}
            <Wordmark
              size="lg"
              className="[&>span]:text-background [&>svg]:text-foil"
            />
          </h2>
          <p className="font-heading text-background/80 max-w-xs text-lg italic">
            {brand.tagline}
          </p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.id} aria-labelledby={`footer-${column.id}-heading`}>
            <h2 className={COLUMN_TITLE} id={`footer-${column.id}-heading`}>
              {column.title}
            </h2>
            <FooterLinks links={column.links} />
          </nav>
        ))}
        {hasPaymentMethods ? (
          <div>
            <h2 id="footer-payment-methods-heading" className={COLUMN_TITLE}>
              Payment methods
            </h2>
            <ul
              role="list"
              aria-labelledby="footer-payment-methods-heading"
              className="flex flex-wrap items-center gap-2"
            >
              {shopInfo.paymentMethods.map((method) => (
                <li
                  key={method}
                  className="bg-background text-foreground max-w-full rounded-sm"
                >
                  <PaymentMethodIcon method={method} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <Separator className="bg-background/15" />
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav aria-label="Policies">
          <ul role="list" className="flex flex-wrap gap-x-5">
            {POLICY_ITEMS.map((link) => (
              <li key={link.to}>
                <Button
                  asChild
                  variant="link"
                  className="text-background/70 hover:text-background h-10 px-0 text-xs font-normal"
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-background/70 max-w-xl">{brand.pdp.footerBlurb}</p>
      </div>
    </footer>
  );
}
