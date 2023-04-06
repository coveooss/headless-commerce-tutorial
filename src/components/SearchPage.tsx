import { useEffect } from "react";
import "../App.css";
import ResultList from "../components/ResultList";
import Facet from "../components/Facet";
import Pager from "../components/Pager";
import Sort from "../components/Sort";
import FreqViewedList from "../components/FreqViewedList";
import {
  searchBox as SearchBoxController,
  resultList as ResultListController,
  categoryFacet as CategoryFacetController,
  colorFacet as ColorFacetController,
  levelFacet as LevelFacetController,
  pager as PagerController,
  instantResults as InstantResultsController,
  sort as SortController,
  criteria as SortCriteria,
  frequentlyViewedTogetherList,
  // frequentlyBoughtTogetherList,
} from "../controllers/controllers";
import { headlessEngine } from "../Engine";

function SearchPage() {
  const logViewEvent = () => {
    coveoua("set", "page", "/");
    coveoua("send", "pageview");
  };

  useEffect(() => {
    headlessEngine.executeFirstSearch();
    logViewEvent();
  }, []);
  return (
    <div className="app">
      <div className="app-body">
        <div className="main-section">
          <div className="facet-section column">
            <Facet controller={CategoryFacetController} title="Category" />
            <Facet controller={ColorFacetController} title="Color" />
            <Facet controller={LevelFacetController} title="Level" />
          </div>
          <div className="results-section column">
            <Sort controller={SortController} criteria={SortCriteria} />
            <ResultList controller={ResultListController} />
            <Pager controller={PagerController} />
            {/* <FreqViewedList
              productID="SP01007_00003"
              controller={frequentlyViewedTogetherList}
    /> */}
            <FreqViewedList
              productID="SP01007_00003"
              controller={frequentlyViewedTogetherList}
            />
            {/* <FreqBoughtList
              productID="SP00951_00004"
              controller={frequentlyBoughtTogetherList}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
