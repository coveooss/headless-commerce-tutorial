import { FrequentlyViewedTogetherList } from "@coveo/headless/product-recommendation";
import { useEffect, useState } from "react";
import {
  frequentlyViewedTogetherPREngine as productRecommendationsEngine,
  logRecsClick,
} from "../../Engine";
import { Link } from "react-router-dom";

interface FreqViewedTogetherProps {
  controller: FrequentlyViewedTogetherList;
  productID: string;
}

export const FreqViewedTogether: React.FC<FreqViewedTogetherProps> = (
  props
) => {
  const { controller, productID } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
    controller.refresh();
  }, [controller]);

  if (state.error) {
    return null;
  }

  controller.setSkus([productID]);

  return (
    <div className="recs-list">
      <h2>People also viewed</h2>
      <ul>
        {state.recommendations.map((recommendation) => {
          return (
            <li key={recommendation.permanentid}>
              <h2>
                <Link
                  to={`/products/${recommendation.permanentid as string}`}
                  state={{ result: recommendation }}
                  onClick={() =>
                    logRecsClick(recommendation, productRecommendationsEngine)
                  }
                >
                  {recommendation.ec_name}
                </Link>
              </h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FreqViewedTogether;
