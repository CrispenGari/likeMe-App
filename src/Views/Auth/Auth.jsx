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
  const [credentials, setCredentials] = useState({});
  return (
    <div className="auth">
      {/* {<h1>LIKE ME</h1>} */}

      <img src={logos.main_logo} alt="" />
      <div className="auth__main">
        {cardToMount === "register" ? (
          <Register
            setCardToMount={setCardToMount}
            setCredentials={setCredentials}
          />
        ) : cardToMount === "login" ? (
          <Login setCardToMount={setCardToMount} />
        ) : cardToMount === "reset" ? (
          <Reset setCardToMount={setCardToMount} />
        ) : (
          <Profile
            setCardToMount={setCardToMount}
            setCredentials={setCredentials}
            credentials={credentials}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
