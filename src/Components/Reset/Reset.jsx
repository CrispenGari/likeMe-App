import "./Reset.css";

import React from "react";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import firebase from "../../backend";
import { ActivityIndicator } from "../Common";
const Reset = ({ setCardToMount }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const reset = (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      firebase.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoading(true);
          setError("");
          setMessage(
            `The reset password link has been sent to ${email}. Please check your email and reset your password to login.`
          );
          setEmail("");
        })
        .catch((error) => {
          setLoading(true);
          setError(error.message);
        });
    } else {
      setError("Email address is required.");
    }
  };
  return (
    <form className="reset">
      <h1>Reset Password</h1>
      <div className="reset__input">
        <p>Your password reset link will be send to this email.</p>
        <div
          className={`reset__input__field ${
            error && "reset__input__form--error"
          }`}
        >
          <HiOutlineMail className="reset__input__icon" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
        </div>
      </div>
      <p className="reset__message">{message}</p>
      <p className="reset__error">{error}</p>

      <button type="submit" onClick={reset}>
        RESET {loading ? <ActivityIndicator /> : null}
      </button>
      <div className="reset__bottom">
        <button
          onClick={() => {
            setError("");
            setMessage("");
            setLoading(false);
            setEmail("");
            setCardToMount("login");
          }}
        >
          GO BACK TO LOGIN
        </button>
      </div>
    </form>
  );
};

export default Reset;
