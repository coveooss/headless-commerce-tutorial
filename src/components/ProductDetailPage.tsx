import { useLocation } from "react-router-dom";
import { FreqViewedList } from "./FreqViewedList";
import { frequentlyViewedTogetherList as frequentlyViewedTogetherListController } from "../controllers/controllers";

function ProductDetailPage() {
  const { result } = useLocation().state;
  console.log(result);
  const productID = result.raw.permanentid as string;
  return (
    <div className="pdp-section">
      <div className="product">
        <div className="product-heading">
          <h1>{result.title}</h1>
          <p>${result.raw.ec_price as string}</p>
        </div>

        <div className="product-info">
          <p>
            <strong>BRAND:</strong> {result.raw.ec_brand as string}
          </p>
          <p>
            <strong>RATING:</strong> {result.raw.ec_rating as string} stars
          </p>
          <p>
            <strong>PRODUCT-ID:</strong> {productID}
          </p>
          {result.raw.ec_description as string}
        </div>
      </div>
      <div className="recs-section">
        <h2>People also viewed</h2>
        <FreqViewedList
          controller={frequentlyViewedTogetherListController}
          productID={productID}
        />
      </div>
    </div>
  );
}

export default ProductDetailPage;
