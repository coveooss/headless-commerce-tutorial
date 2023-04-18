import {
  buildSearchEngine,
  buildContext,
  loadFieldActions,
  SearchEngine,
  getOrganizationEndpoints,
} from "@coveo/headless";
import {
  buildProductRecommendationEngine,
  loadClickAnalyticsActions,
  ProductRecommendation,
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
  buildContext(headlessEngine as any).add("website", "sports");
  return headlessEngine;
};

const createSearchEngine = buildSearchEngine({
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
export const headlessEngine = registerAdditionalFields(
  createSearchEngine
) as SearchEngine;

const createPREngine = () =>
  buildProductRecommendationEngine({
    configuration: {
      organizationId: "barcagroupproductionkwvdy6lp",
      accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
      organizationEndpoints: getOrganizationEndpoints(
        "barcagroupproductionkwvdy6lp"
      ),
      searchHub: "PDP",
    },
  });

export const frequentlyViewedTogetherPREngine = registerAdditionalFields(
  createPREngine()
) as ProductRecommendationEngine;

export const cartRecommendationsPREngine = registerAdditionalFields(
  createPREngine()
) as ProductRecommendationEngine;

export const logRecsClick = (
  recommendation: ProductRecommendation,
  engine: ProductRecommendationEngine
) => {
  const { logProductRecommendationOpen } = loadClickAnalyticsActions(engine);
  engine.dispatch(logProductRecommendationOpen(recommendation));
};
