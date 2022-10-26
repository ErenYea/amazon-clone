import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./Product.css";
import { useStateValue } from "./StateProvider";

const Product = ({ title, image, price, rating, id }) => {
  const [state, dispatch] = useStateValue();
  const AddtoBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: { title, image, price, rating, id },
    });
    dispatch({
      type: "SHOW_NOTIFICATIONCOMPO",
    });
    dispatch({
      type: "SHOW_NOTIFICATION",
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(parseInt(rating))
            .fill(1)
            .map((i) => {
              return <StarRateIcon className="product__ratingIcon" />;
            })}

          {/* <StarRateIcon className="product__ratingIcon" /> */}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={AddtoBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
