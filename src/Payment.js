import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db, doc, setDoc } from "./firebase";
const Payment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const [state, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    if (state.basket?.length > 0) {
      const getClientSecret = async () => {
        const headers = {
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.post(
          `/payments/create?total=${Math.round(
            getBasketTotal(state.basket) * 100
          )}`
        );
        //   method: "post",
        //   // Stripe expects the total in currencies subunits like if it is dollars then stripe would accept it in cents
        //   url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`,
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //   },
        // });
        setClientSecret(response.data.clientSecret);
      };
      getClientSecret();
    }
  }, [state.basket]);
  const handleSubmit = async (e) => {
    // do all the stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        setDoc(doc(db, "users", state.user?.uid, "orders", paymentIntent.id), {
          basket: state.basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // db.collection("users")
        //   .doc(state.user?.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     basket: state.basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (e) => {
    // Listen for the changes of card Element
    // to display any error as customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  console.log("the Secreat of client>>", clientSecret);
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{state.basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{state?.user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {state.basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
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
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
