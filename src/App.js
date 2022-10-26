import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Notification from "./Notification";
import { useStateValue } from "./StateProvider";
import Login from "./Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51LwrwHL0uAH7L9TA1s7DTIrN4XuoYDKJ00heTecCyhxkgJr0RdWBGJtrhgA6bPAZZgoBz4YpcJEizuF3kNzQDRqm00338EihP2"
);
function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch({
          type: "ADD_USER",
          payload: user,
        });

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        {state.showheader || window.location.pathname != "/login" ? (
          <Header />
        ) : (
          ""
        )}

        {state.shownotificationcompo ? (
          <Notification data={"Product has been added"} />
        ) : (
          ""
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home cond={true} />} />
          <Route
            path="/noti"
            element={<Notification data={"Product has been added"} />}
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        {/* <Home /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
