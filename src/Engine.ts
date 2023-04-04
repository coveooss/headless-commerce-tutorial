import {
  buildSearchEngine,
  buildContext,
  loadFieldActions,
  SearchEngine,
} from "@coveo/headless";
import {
  buildProductRecommendationEngine,
  ProductRecommendationEngine,
} from "@coveo/headless/product-recommendation";

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

const registerAdditionalFields = (
  headlessEngine: SearchEngine | ProductRecommendationEngine
) => {
  const fieldActions = loadFieldActions(headlessEngine);
  headlessEngine.dispatch(fieldActions.registerFieldsToInclude(FIELDS));
  buildContext(headlessEngine as SearchEngine).add("website", "sports");
  return headlessEngine;
};

const createSearchEngine = buildSearchEngine({
  configuration: {
    organizationId: "barcagroupproductionkwvdy6lp",
    accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
    search: {
      pipeline: "Sports",
      searchHub: "MainSearch",
    },
  },
});
export const headlessEngine = registerAdditionalFields(
  createSearchEngine
) as SearchEngine;

export const createPREngine = buildProductRecommendationEngine({
  configuration: {
    organizationId: "barcagroupproductionkwvdy6lp",
    accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
  },
});

// export const createPREngine = buildProductRecommendationEngine({
//   configuration: {
//     accessToken: 'xxc23ce82a-3733-496e-b37e-9736168c4fd9',
//     organizationId: 'electronicscoveodemocomo0n2fu8v',
//     platformUrl: 'https://platform.cloud.coveo.com',
//   },
// });

export const productRecommendationsEngine = registerAdditionalFields(
  createPREngine
) as ProductRecommendationEngine;
