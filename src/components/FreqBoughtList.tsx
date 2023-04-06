import {
  FrequentlyBoughtTogetherList,
  loadClickAnalyticsActions,
  ProductRecommendation,
} from "@coveo/headless/product-recommendation";
import { useEffect, useState, FunctionComponent } from "react";
import { productRecommendationsEngine } from "../Engine";

interface FreqBoughtListProps {
  controller: FrequentlyBoughtTogetherList;
  productID: string;
}

export const FreqBoughtList: React.FC<FreqBoughtListProps> = (props) => {
  const { controller, productID } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  if (state.error) {
    return null;
  }

  const logClick = (recommendation: ProductRecommendation) => {
    if (!productRecommendationsEngine) {
      return;
    }
    const { logProductRecommendationOpen } = loadClickAnalyticsActions(
      productRecommendationsEngine
    );
    productRecommendationsEngine.dispatch(
      logProductRecommendationOpen(recommendation)
    );
  };
  console.log(productID);
  console.log(controller);

  if (!state.recommendations.length) {
    return <button onClick={() => controller.refresh()}>Refresh</button>;
  } else {
    return (
      <div>
        <button onClick={() => controller.refresh()}>
          FreqBought - Refresh
        </button>
        <ul style={{ textAlign: "left" }}>
          {state.recommendations.map((recommendation) => (
            <li key={recommendation.permanentid}>
              <article>
                <h2>
                  {/* Make sure to log analytics when the recommendation is clicked. */}
                  <a
                    href={recommendation.clickUri} // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
                    // onClick={() => logClick(recommendation)}
                    onContextMenu={() => logClick(recommendation)}
                    onMouseDown={() => logClick(recommendation)}
                    onMouseUp={() => logClick(recommendation)}
                  >
                    {recommendation.ec_name}
                  </a>
                </h2>
                <p>{recommendation.ec_shortdesc}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default FreqBoughtList;
