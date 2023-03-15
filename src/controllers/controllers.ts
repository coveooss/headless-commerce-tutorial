import {SearchBox, buildSearchBox, buildResultList, buildFacet} from '@coveo/headless'
import { headlessEngine } from '../Engine'

export const searchBox: SearchBox = buildSearchBox(headlessEngine)

export const resultList = buildResultList(headlessEngine);

export const facet = buildFacet(headlessEngine, {options: {field: 'ec_category'}});