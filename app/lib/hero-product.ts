import { gql } from "@shopify/hydrogen";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";

import { brand } from "~/content/brand";
import { colours as catalogColours, type ColourId } from "~/content/catalog";
import { heroProduct } from "~/content/hero-product";

export const HERO_PRODUCT_QUERY = gql(`
  query HeroProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
      options {
        name
        optionValues {
          name
          swatch {
            color
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          sku
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`);

type Money = Pick<MoneyV2, "amount" | "currencyCode">;

type HeroProductData = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  options: Array<{
    name: string;
    optionValues: Array<{
      name: string;
      swatch?: { color?: string | null } | null;
    }>;
  }>;
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      sku?: string | null;
      availableForSale: boolean;
      selectedOptions: Array<{ name: string; value: string }>;
      price: Money;
      compareAtPrice?: Money | null;
    }>;
  };
};

/** One of our colourways, resolved to the Shopify variant that sells it. */
export type HeroColour = {
  id: ColourId;
  /** The brand's name for the colourway. */
  name: string;
  /** The Shopify option value ("Saddle", or a stand-in's "Hardcover"). */
  optionValue: string;
  swatch: string;
  variantId: string;
  variantTitle: string;
  sku: string | null;
  available: boolean;
  price: Money;
};

export type HeroProduct = {
  id: string;
  /** The Shopify handle actually queried (the stand-in's in mock mode). */
  shopifyHandle: string;
  title: string;
  vendor: string;
  /** True when a mock.shop stand-in supplies the variants. */
  standIn: boolean;
  colours: HeroColour[];
};

/** The Shopify handle to query for the hero product. */
export function heroQueryHandle(standIn: boolean): string {
  return standIn ? heroProduct.standIn.handle : heroProduct.handle;
}

function colourIdFor(
  optionValue: string,
  standIn: boolean,
): ColourId | undefined {
  if (standIn) {
    return (heroProduct.standIn.colours as Record<string, ColourId>)[
      optionValue
    ];
  }
  const value = optionValue.toLowerCase();
  return catalogColours.find(
    (colour) =>
      colour.id === value ||
      brand.store.colourNames[colour.id].toLowerCase() === value,
  )?.id;
}

/** Maps the Shopify product onto our colourways, in catalogue order. */
export function toHeroProduct(
  product: HeroProductData,
  standIn: boolean,
): HeroProduct {
  const fixedOptions: ReadonlyArray<{ name: string; value: string }> = standIn
    ? heroProduct.standIn.fixedOptions
    : [];
  // The stand-in's option can have another name ("Format" on books.mock.shop).
  const colourOptionName = standIn
    ? heroProduct.standIn.colourOption
    : heroProduct.colourOption;
  const colourOption = product.options.find(
    (option) => option.name === colourOptionName,
  );

  const colours = (colourOption?.optionValues ?? []).flatMap(
    (value): HeroColour[] => {
      const id = colourIdFor(value.name, standIn);
      if (!id) return [];
      const variant = product.variants.nodes.find((candidate) =>
        [{ name: colourOptionName, value: value.name }, ...fixedOptions].every(
          (wanted) =>
            candidate.selectedOptions.some(
              (option) =>
                option.name === wanted.name && option.value === wanted.value,
            ),
        ),
      );
      if (!variant) return [];
      const catalogColour = catalogColours.find((colour) => colour.id === id)!;
      return [
        {
          id,
          name: brand.store.colourNames[id],
          optionValue: value.name,
          // A stand-in's swatches are the wrong colours, so use our own.
          swatch:
            (standIn ? null : value.swatch?.color) ?? catalogColour.swatch,
          variantId: variant.id,
          variantTitle: variant.title,
          sku: variant.sku ?? null,
          available: variant.availableForSale,
          price: variant.price,
        },
      ];
    },
  );

  const order = catalogColours.map((colour) => colour.id);
  colours.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return {
    id: product.id,
    shopifyHandle: product.handle,
    title: product.title,
    vendor: product.vendor,
    standIn,
    colours,
  };
}
