import React, { useState } from "react";
import "./Auth.css";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";
import Profile from "../../Components/Profile/Profile";
import Reset from "../../Components/Reset/Reset";

import { logos } from "../../utils/logos";

const Auth = () => {
  document.title = `LikeMe • Authentication`;
  const [cardToMount, setCardToMount] = useState("login");
  return (
    <div className="auth">
      {/* {<h1>LIKE ME</h1>} */}

      <img src={logos.main_logo} alt="" />
      <div className="auth__main">
        {cardToMount === "register" ? (
          <Register setCardToMount={setCardToMount} />
        ) : cardToMount === "login" ? (
          <Login setCardToMount={setCardToMount} />
        ) : (
          <Reset setCardToMount={setCardToMount} />
        )}
      </div>
    </div>
  );
};

export default Auth;
