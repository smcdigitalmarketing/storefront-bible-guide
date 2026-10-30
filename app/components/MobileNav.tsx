import { MenuIcon } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { brand } from "~/content/brand";
import {
  MOBILE_NAV_DRAWER_ID,
  closeMobileNavDrawer,
  openMobileNavDrawer,
  returnFocusOnClose,
  useDrawer,
} from "~/lib/cart-drawer";

import { HELP_ITEMS, NAV_ITEMS, storePaths, type NavItem } from "./store/nav";
import { Wordmark } from "./store/Wordmark";

// The five store links in serif, then help in plain type.
const PRIMARY_ITEMS: NavItem[] = [
  ...NAV_ITEMS.filter((item) => item.to !== storePaths.faq),
  { label: brand.store.nav.about, to: storePaths.about },
];
const SECONDARY_ITEMS: NavItem[] = [
  { label: "FAQ", to: storePaths.faq },
  ...HELP_ITEMS.filter((item) => item.to !== storePaths.about),
  { label: "Account", to: storePaths.account },
];

function NavList({
  items,
  label,
  size,
}: {
  items: NavItem[];
  label: string;
  size: "lg" | "md";
}) {
  return (
    <nav aria-label={label} className="px-2 py-2">
      <ul role="list" className="flex flex-col">
        {items.map((link) => (
          <li key={link.to}>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className={
                size === "lg"
                  ? "font-heading h-12 w-full justify-start rounded-sm px-3 text-2xl font-medium"
                  : "text-muted-foreground hover:text-foreground h-11 w-full justify-start rounded-sm px-3 text-base font-normal"
              }
            >
              <Link to={link.to} onClick={() => closeMobileNavDrawer()}>
                {link.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useDrawer(MOBILE_NAV_DRAWER_ID);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        id={MOBILE_NAV_DRAWER_ID}
        side="left"
        className="bg-background w-[85%] gap-0 sm:max-w-sm"
        data-testid="mobile-nav"
        onCloseAutoFocus={returnFocusOnClose}
      >
        <SheetHeader className="border-b px-5 py-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Wordmark size="md" />
          <SheetDescription className="sr-only">
            Browse the store
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pb-4">
          <NavList items={PRIMARY_ITEMS} label="Mobile navigation" size="lg" />
          <Separator />
          <NavList items={SECONDARY_ITEMS} label="Help" size="md" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MobileNavTrigger() {
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="rounded-full"
      aria-label="Menu"
      aria-controls={MOBILE_NAV_DRAWER_ID}
      aria-haspopup="dialog"
      data-testid="nav-trigger"
      onClick={() => openMobileNavDrawer()}
    >
      <MenuIcon className="size-5" aria-hidden="true" />
    </Button>
  );
}
