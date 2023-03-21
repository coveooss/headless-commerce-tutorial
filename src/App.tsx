import { useEffect } from "react";
import "./App.css";
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import Pager from "./components/Pager";
import Sort from "./components/Sort";
import {
  searchBox as SearchBoxController,
  resultList as ResultListController,
  facet as FacetController,
  pager as PagerController,
  instantResults as InstantResultsController,
  sort as SortController,
  criteria as SortCriteria,
} from "./controllers/controllers";
import { headlessEngine } from "./Engine";

declare global {
  function coveoua(action?: string, fieldName?: any, fieldValue?: any): any;
}

function App() {
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
      <header className="app-header">
        <img src={require("./assets/barca.svg").default} alt="barcaLogo" />
        <div className="search-section">
          <SearchBox
            controllerSearchbox={SearchBoxController}
            controllerInstantResults={InstantResultsController}
          />
        </div>
      </header>
      <div className="app-body">
        <div className="main-section">
          <div className="facet-section column">
            <Facet controller={FacetController} title="Category" />
          </div>
          <div className="results-section column">
            <Sort controller={SortController} criteria={SortCriteria} />
            <ResultList controller={ResultListController} />
            <Pager controller={PagerController} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
