import React from "react";
import "./CheckoutProduct.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({ id, image, price, title, rating }) => {
  const [state, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      payload: id,
    });
    console.log("ssssss", state);
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProdcut__price">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(parseInt(rating))
            .fill(1)
            .map((i) => {
              return <StarRateIcon className="product__ratingIcon" />;
            })}
        </div>
        {window.location.pathname != "/orders" ? (
          <button onClick={removeFromBasket}>Remove from basket</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
