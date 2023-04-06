import {
  SearchBox,
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildPager,
  buildInstantResults,
  SortCriterion,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  buildFieldSortCriterion,
  SortOrder,
  buildSort,
} from "@coveo/headless";
import {
  buildFrequentlyViewedTogetherList,
  buildCartRecommendationsList,
} from "@coveo/headless/product-recommendation";
import { headlessEngine } from "../Engine";
import {
  frequentlyViewedTogetherPREngine,
  cartRecommendationsPREngine,
} from "../Engine";

export const searchBox: SearchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);
export const instantResults = buildInstantResults(headlessEngine, {
  options: { maxResultsPerQuery: 1 },
});

export const categoryFacet = buildFacet(headlessEngine, {
  options: { field: "ec_category" },
});
export const colorFacet = buildFacet(headlessEngine, {
  options: { field: "cat_color" },
});
export const levelFacet = buildFacet(headlessEngine, {
  options: { field: "cat_level" },
});

export const pager = buildPager(headlessEngine);

export const criteria: [string, SortCriterion][] = [
  ["Relevance", buildRelevanceSortCriterion()],
  ["Date (Ascending)", buildDateSortCriterion(SortOrder.Ascending)],
  ["Size (Ascending)", buildFieldSortCriterion("size", SortOrder.Ascending)],
];
const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
  initialState: { criterion: initialCriterion },
});

export const frequentlyViewedTogether = buildFrequentlyViewedTogetherList(
  frequentlyViewedTogetherPREngine,
  {
    options: {
      maxNumberOfRecommendations: 5,
    },
  }
);

export const cartRecommendations = buildCartRecommendationsList(
  cartRecommendationsPREngine,
  {
    options: {
      maxNumberOfRecommendations: 5,
    },
  }
);

// console.log(productRecommendationsEngine)
