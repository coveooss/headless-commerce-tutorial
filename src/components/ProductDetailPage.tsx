import { useLocation, useNavigate } from "react-router-dom";
import { FreqViewedTogether } from "./recommendations/FreqViewedTogether";
import CartRecommendations from "./recommendations/CartRecommendations";
import {
  frequentlyViewedTogether as frequentlyViewedTogetherController,
  cartRecommendations as CartRecommendationsController,
} from "../controllers/controllers";
import { useEffect } from "react";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { result } = useLocation().state;
  const item = result.permanentid ? result : result.raw; // This condition can be translated like so: if the permanentid is defined or thruthy (so no need to check if it's null) the item will be the result, otherwise it will be the raw property of the result.
  const productID = item.permanentid as string;
  const logViewEvent = () => {
    coveoua("set", "page", `/products/${productID}`);
    coveoua("send", "pageview");
  };
  useEffect(() => {
    logViewEvent();
  }, [item]);
  return (
    <div className="pdp-section">
      <div className="product">
        <div className="product-heading">
          <h1>{item.ec_name}</h1>
          <p>${item.ec_price as string}</p>
        </div>
        <div className="product-info">
          <p>
            <strong>BRAND:</strong> {item.ec_brand as string}
          </p>
          <p>
            <strong>RATING:</strong> {item.ec_rating as string} stars
          </p>
          <p>
            <strong>PRODUCT-ID:</strong> {productID}
          </p>
        </div>
      </div>
      <button className="back-to-search" onClick={() => navigate("/")}>
        Back to search
      </button>
      <div className="recs-section">
        <FreqViewedTogether
          controller={frequentlyViewedTogetherController}
          productID={productID}
        />
        <CartRecommendations
          controller={CartRecommendationsController}
          productID={productID}
        />
      </div>
    </div>
  );
}

export default ProductDetailPage;
