import React, { useState } from "react";

import "./Auth.scss";
import { AiFillLike } from "react-icons/ai";
import firebase from "../../backend";
import fb from "firebase";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";

const Auth = () => {
  const [error, setError] = useState("");
  document.title = `LikeMe • Authentication`;

  const login = (type) => {
    firebase.auth
      .signInWithPopup(
        type === "google"
          ? firebase.googleAuthProvider
          : type === "facebook"
          ? firebase.facebookProvider
          : firebase.twitterAuthProvider
      )
      .then((authUser) => {
        // console.log(authUser.additionalUserInfo.isNewUser);
        // Check if the user is a new user and get his or her information and post to the database
        if (authUser.additionalUserInfo.isNewUser) {
          firebase.db.collection("users").add({
            displayName: authUser.user.displayName,
            email: authUser.user.email,
            emailVerified: authUser.user.emailVerified,
            phoneNumber: authUser.user.phoneNumber,
            photoURL: authUser.user.photoURL,
            firstName: authUser.additionalUserInfo.profile?.given_name,
            surname: authUser.additionalUserInfo.profile?.family_name,
            providerId: authUser.additionalUserInfo.providerId,
            uid: authUser.user.uid,
            creationTime: authUser.user.metadata.creationTime,
            lastSignInTime: authUser.user.metadata.lastSignInTime,
            timestamp: fb.firestore.FieldValue.serverTimestamp(),
          });
        }
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
        <div className="auth__message">
          <TiMessages className="auth__message__icon" />
          <p>
            We highly recommend you to <strong>Sign In</strong> with{" "}
            <strong>Google</strong> the other providers are still on testing.
          </p>
        </div>

        <p className="auth__error">{error}</p>
        <button onClick={() => login("google")}>
          <FcGoogle /> Google
        </button>
        <button onClick={() => login("facebook")}>
          <FaFacebook /> Facebook
        </button>
        <button onClick={() => login("twitter")}>
          {" "}
          <GrTwitter /> Twitter
        </button>
        <small>
          By using this application, you are automatically accepting the terms
          and conditions. <Link to="/terms">Terms and Conditions</Link>
        </small>
        <small>Developed by Crispen Gari</small>
      </div>
    </div>
  );
};

export default Auth;
