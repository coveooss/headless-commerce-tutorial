import { useState, useEffect } from "react";
import { ResultList as ResultListController, Result, buildInteractiveResult, } from "@coveo/headless";
import { headlessEngine } from "../Engine";

interface ResultListProps {
  controller: ResultListController;
}

const sendAddToCartEvent = (result: Result) => {
  coveoua("ec:addProduct", {
    id: result.uniqueId,
    name: result.title,
  });
  coveoua("ec:setAction", "add", {
    list: headlessEngine.state.search.response.searchUid,
  });
  coveoua("send", "event");
};

const interactiveResult = (result: Result) => {
  const interactiveResultController = buildInteractiveResult(headlessEngine, {
    options: { result: result },
  });
  return (
    <a href="#" onClick={() => interactiveResultController.select()}>
      {result.title}
    </a>
  );
};

const sportsResultsTemplate = (result: Result) => {
  return (
    <li key={result.uniqueId}>
      <div>
        <div className="result-item-header">
          <h2>{result.title}</h2>
          <button className="result-button">Add to cart</button>
        </div>
        <p>
          {result.excerpt} {result.raw.source}
        </p>
      </div>
    </li>
  );
};

const defaultResultsTemplate = (result: Result) => {
  return <p>{result.title}</p>;
};

const ResultList: React.FC<ResultListProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );
  if (!state.results.length) {
    return <div>No results</div>;
  }

  return (
    <div className="result-list">
      <ul>
        {state.results.map((result) => {
          if (result.raw.source === "Sports") {
            return sportsResultsTemplate(result);
          } else {
            return defaultResultsTemplate(result);
          }
        })}
      </ul>
    </div>
  );
};

export default ResultList;
