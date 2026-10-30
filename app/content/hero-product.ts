import { GUIDE_HANDLE, type ColourId } from "./catalog";

/**
 * The product the SOP page sells, at /products/<handle>. In the real store it
 * has one option, `colourOption`, whose values are the brand's cover names in
 * `brand.store.colourNames` ("Saddle", "Walnut", "Ebony").
 */
export const heroProduct = {
  handle: GUIDE_HANDLE,
  colourOption: "Color",
  /**
   * Development stand-in on mock.shop (books.mock.shop), used while no
   * Shopify store is linked: a hardcover whose Format option has three
   * values. Each maps to one of our covers, so the page shows the guide and
   * brand names while the cart holds real mock.shop variants.
   */
  standIn: {
    handle: "hardcover-the-annotated-journey",
    colourOption: "Format",
    fixedOptions: [],
    colours: {
      Hardcover: "saddle",
      Paperback: "espresso",
      Digital: "black",
    } satisfies Record<string, ColourId>,
  },
} as const;
