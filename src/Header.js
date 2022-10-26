import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Header() {
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  const checkout = () => {
    if (state.user != null) {
      navigate("/checkout");
    } else {
      alert("Please Signin first");
    }
  };
  const toggleheader = () => {
    if (state.user != null) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/logout");
        })
        .catch((error) => {
          // An error happened.
          console.error(error.message);
        });
    } else {
      dispatch({
        type: "TOGGLE_HEADER",
      });
      navigate("/login");
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
          className="header__logo"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        {/* <div className="header__searchbtn"> */}
        <SearchIcon className="header__searchIcon" />
        {/* </div> */}
      </div>
      <div className="header__nav">
        <div className="header__option" onClick={toggleheader}>
          <span className="header__optionLineOne">
            {state.user != null ? state.user?.email : "Hello Guest"}
          </span>
          <span className="header__optionLineTwo">
            {state.user ? "Log out" : "Sign in"}
          </span>
        </div>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <div className="header__optionBasket" onClick={checkout}>
          {/* <Link to="/checkout"> */}
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">
            {state.basket.length}
          </span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
