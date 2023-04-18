import {
  buildSearchEngine,
  loadFieldActions,
  SearchEngine,
  getOrganizationEndpoints,
} from "@coveo/headless";

const FIELDS = [
  "ec_brand",
  "ec_category",
  "ec_cogs",
  "ec_description",
  "ec_images",
  "ec_in_stock",
  "ec_item_group_id",
  "ec_listing",
  "ec_name",
  "ec_parent_id",
  "ec_price",
  "ec_product_id",
  "ec_promo_price",
  "ec_rating",
  "ec_reviews",
  "ec_shortdesc",
  "ec_skus",
  "ec_thumbnails",
  "ec_variant_sku",
  "permanentid",
];

const registerAdditionalFields = (headlessEngine: SearchEngine) => {
  const fieldActions = loadFieldActions(headlessEngine);
  headlessEngine.dispatch(fieldActions.registerFieldsToInclude(FIELDS));
  return headlessEngine;
};

const buildEngine = buildSearchEngine({
  configuration: {
    organizationId: "barcagroupproductionkwvdy6lp",
    accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
    organizationEndpoints: getOrganizationEndpoints(
      "barcagroupproductionkwvdy6lp"
    ),
    search: {
      pipeline: "Sports",
      searchHub: "MainSearch",
    },
  },
});

export const headlessEngine = registerAdditionalFields(buildEngine);
