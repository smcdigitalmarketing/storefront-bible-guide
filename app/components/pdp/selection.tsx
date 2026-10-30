import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "react-router";

import { colourIds, type ColourId } from "~/content/catalog";
import { getBundle, pricing } from "~/content/offers";
import type { BundleId } from "~/content/types";
import {
  addLinesToCart,
  bundleLines,
  waitForUpdateCart,
} from "~/lib/bundle-cart";
import { useCart, useCartActions } from "~/lib/cart";
import { openCartDrawer } from "~/lib/cart-drawer";
import type { HeroColour, HeroProduct } from "~/lib/hero-product";
import { useOffer } from "~/lib/offer";

type Selection = ReturnType<typeof useSelectionState>;

const SelectionContext = createContext<Selection | null>(null);

function useSelectionState(hero: HeroProduct) {
  const { id: offerId, offer } = useOffer();
  const cartId = useCart((state) => state.data.id);
  const { refresh } = useCartActions();
  const [searchParams] = useSearchParams();
  const slots = Math.max(...offer.bundles.map((bundle) => bundle.quantity));
  const firstColour =
    hero.colours.find((colour) => colour.available)?.id ??
    hero.colours[0]?.id ??
    "black";
  const [bundleId, setBundleId] = useState<BundleId>(offer.defaultBundle);
  // One colour per copy; a bundle uses the first `quantity` of them.
  const [colours, setColours] = useState<ColourId[]>(() =>
    Array(slots).fill(firstColour),
  );
  const [previewColour, setPreviewColour] = useState<ColourId>(firstColour);
  const [adding, setAdding] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bundle = getBundle(offer, bundleId);
  const chosen = colours.slice(0, bundle.quantity);

  // Links from the home and shop pages can preselect a colour (?colour=pink).
  useEffect(() => {
    const requested = searchParams.get("colour") as ColourId | null;
    if (requested && colourIds.includes(requested)) {
      setColours(Array(slots).fill(requested));
      setPreviewColour(requested);
    }
  }, [searchParams, slots]);

  return useMemo(
    () => ({
      hero,
      offerId,
      offer,
      bundle,
      price: pricing(bundle),
      setBundleId,
      /** The colour of each copy in the chosen bundle. */
      colours: chosen,
      /** Every slot, for previewing other bundle sizes. */
      allColours: colours,
      previewColour,
      setPreviewColour,
      setColour(slot: number, colour: ColourId) {
        setColours((current) =>
          current.map((c, i) => (i === slot ? colour : c)),
        );
        setPreviewColour(colour);
      },
      /** The Shopify variant behind a colourway, if the product sells it. */
      colourVariant(colour: ColourId): HeroColour | undefined {
        return hero.colours.find((candidate) => candidate.id === colour);
      },
      /** Every chosen colour is sold and in stock. */
      canAdd: chosen.every(
        (colour) =>
          hero.colours.find((candidate) => candidate.id === colour)?.available,
      ),
      adding,
      /**
       * Adds the bundle as one cart line per variant, tagged with the bundle,
       * then opens the cart. Returns false when the cart store isn't ready (no
       * JavaScript yet), so the caller's no-JS form can submit instead.
       */
      async addToCart(): Promise<boolean> {
        if (!(await waitForUpdateCart())) return false;
        const variantIds = chosen.flatMap((colour) => {
          const variant = hero.colours.find(
            (candidate) => candidate.id === colour,
          );
          return variant ? [variant.variantId] : [];
        });
        setAdding(true);
        try {
          const split = await addLinesToCart(
            bundleLines(variantIds, { bundleId: bundle.id, offerId }),
            { hasCart: Boolean(cartId) },
          );
          // The first bundle in a new cart goes in two calls; refresh so the
          // drawer lists every line, not just the first call's.
          if (split) await refresh();
          openCartDrawer();
        } finally {
          setAdding(false);
        }
        return true;
      },
      /** The main add-to-cart button; the sticky bar watches it. */
      ctaRef,
    }),
    [
      hero,
      offerId,
      offer,
      bundle,
      chosen,
      colours,
      previewColour,
      adding,
      cartId,
      refresh,
    ],
  );
}

export function SelectionProvider({
  hero,
  children,
}: {
  hero: HeroProduct;
  children: ReactNode;
}) {
  const value = useSelectionState(hero);
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

/** The selection inside the SOP page, or null elsewhere. */
export function useOptionalSelection() {
  return useContext(SelectionContext);
}

export function useSelection() {
  const value = useContext(SelectionContext);
  if (!value)
    throw new Error("useSelection must be used inside SelectionProvider");
  return value;
}
