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
} from '@coveo/headless'
import { headlessEngine } from '../Engine'

export const searchBox: SearchBox = buildSearchBox(headlessEngine);
export const searchBox: SearchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);
export const instantResults = buildInstantResults(headlessEngine, {
  options: { maxResultsPerQuery: 1 },
});

export const facet = buildFacet(headlessEngine, {
  options: { field: "ec_category" },
});

export const pager = buildPager(headlessEngine);

export const pager = buildPager(headlessEngine);

export const pager = buildPager(headlessEngine);

export const criteria: [string, SortCriterion][] = [
    ['Relevance', buildRelevanceSortCriterion()],
    ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
    ['Size (Ascending)', buildFieldSortCriterion('size', SortOrder.Ascending)],
];
const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
    initialState: {criterion: initialCriterion},
});