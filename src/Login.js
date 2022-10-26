import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    // some fancy firebase login stuff....
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        console.log(user);
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
        dispatch({
          type: "TOGGLE_HEADER",
        });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        console.error(errorMessage);
      });
  };
  const register = (e) => {
    e.preventDefault();
    // some fancy firebase register stuff....
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user>>>", user);
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
        dispatch({
          type: "TOGGLE_HEADER",
        });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  const GoogleSigin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        window.localStorage.setItem("token", token);
        // The signed-in user info.
        const user = result.user;
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
        dispatch({
          type: "TOGGLE_HEADER",
        });
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const Navigation = () => {
    dispatch({
      type: "TOGGLE_HEADER",
    });
    navigate("/");
  };

  return (
    <div className="login">
      <img
        className="login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt=""
        onClick={Navigation}
      />

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
        <br />
        <hr />
        <br />
        <button className="login__registerButton" onClick={GoogleSigin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
