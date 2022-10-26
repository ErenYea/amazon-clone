import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const [state, dispatch] = useStateValue();
  console.log("ssstate", state);
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {state.user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {state.basket?.map((item) => {
            return (
              <CheckoutProduct
                price={item.price}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
              />
            );
          })}
          {/* BasketItem */}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
