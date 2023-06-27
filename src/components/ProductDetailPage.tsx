import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { result } = useLocation().state;
  const item = result.permanentid ? result : result.raw; // the fields that are required to display product info are fetched by the registerAdditionalFields function under src/Engine.ts. Results from searches contain these fields under .raw property. However, recommendations do not contain the raw property and the fields are present on the recs object itself

  const productID = item.permanentid as string;
  const logViewEvent = () => {
    coveoua("set", "page", window.location.pathname);
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
    </div>
  );
}

export default ProductDetailPage;
