import {
    SearchBox, 
    buildSearchBox, 
    buildResultList, 
    buildFacet,
    buildPager,
    buildInstantResults
} from '@coveo/headless'
import { headlessEngine } from '../Engine'

export const searchBox: SearchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);
export const instantResults = buildInstantResults( headlessEngine,{options: {maxResultsPerQuery: 1}});

export const facet = buildFacet(headlessEngine, {options: {field: 'ec_category'}});

export const pager = buildPager(headlessEngine) 