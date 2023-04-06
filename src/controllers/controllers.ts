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
  buildFrequentlyBoughtTogetherList,
  buildFrequentlyViewedDifferentCategoryList,
} from "@coveo/headless/product-recommendation";
import { headlessEngine } from "../Engine";
import { productRecommendationsEngine } from "../Engine";

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

export const frequentlyViewedTogetherList = buildFrequentlyViewedTogetherList(
  productRecommendationsEngine,
  {
    options: {
      maxNumberOfRecommendations: 5,
    },
  }
); // default number of recs?????

export const frequentlyViewedDifferentCategory =
  buildFrequentlyViewedDifferentCategoryList(productRecommendationsEngine, {
    options: {
      maxNumberOfRecommendations: 5,
    },
  });

// export const frequentlyBoughtTogetherList = buildFrequentlyBoughtTogetherList(
//   productRecommendationsEngine,
//   {
//     options: {
//       maxNumberOfRecommendations: 5,
//       sku: "SP01007_00003"
//     },
//   }
// );
