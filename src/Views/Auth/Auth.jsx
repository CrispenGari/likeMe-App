import React, { useState } from "react";
import "./Auth.css";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";
import Profile from "../../Components/Profile/Profile";

const Auth = () => {
  document.title = `LikeMe • Authentication`;
  const [cardToMount, setCardToMount] = useState("login");

  return (
    <div className="auth">
      <h1>LIKE ME</h1>
      <div className="auth__main">
        {cardToMount === "register" ? (
          <Register setCardToMount={setCardToMount} />
        ) : cardToMount === "login" ? (
          <Login setCardToMount={setCardToMount} />
        ) : (
          <Profile setCardToMount={setCardToMount} />
        )}
      </div>
    </div>
  );
};

export default Auth;
