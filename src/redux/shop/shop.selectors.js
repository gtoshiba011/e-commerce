import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

// return an object
export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// return an array
export const selectShopCollectionsForOverview = createSelector(
  [selectShopCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  );
