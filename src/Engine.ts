import {buildSearchEngine} from '@coveo/headless';

export const headlessEngine = buildSearchEngine({
  configuration: {
    organizationId: 'barcagroupproductionkwvdy6lp',
    accessToken: 'xx5a7943ef-ea52-42e5-8742-51198cc651f7',
    search: {
      pipeline: 'Sports',
      searchHub: 'MainSearch',
    },
  },
});
