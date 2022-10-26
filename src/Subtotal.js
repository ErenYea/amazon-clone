import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  // const calculateTotal = () => {
  //   var price = 0;
  //   state.basket.forEach((item) => {
  //     price += item.price;
  //   });
  //   return price;
  // };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({state.basket.length} items):
              <strong>{value}</strong>
            </p>
            <samll className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </samll>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(state.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />

      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
