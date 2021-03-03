import React, { useState } from "react";

import "./Auth.css";
import { AiFillLike } from "react-icons/ai";
import firebase from "../../backend";
const Auth = () => {
  const [error, setError] = useState("");
  const login = () => {
    firebase.auth
      .signInWithPopup(firebase.googleAuthProvider)
      .then((authUser) => {
        console.log(authUser);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="auth">
      <div className="auth__main">
        <h1>
          <AiFillLike className="auth__like__icon" />
          <span>M</span>
          <span>e</span>
        </h1>
        <p>
          Welcome to the <span>LikeMe</span>, where you will find your love
          partner.
        </p>
        <p className="auth__error">{error}</p>
        <button onClick={login}>Continue with Google</button>
        <small>
          By using this application, you are automatically accepting terms and
          conditions. <a href="/">Terms and Conditions</a>
        </small>
        <small>Developed by Crispen Gari</small>
      </div>
    </div>
  );
};

export default Auth;
