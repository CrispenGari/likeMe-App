import React, { useState } from "react";
import "./Auth.css";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";

const Auth = () => {
  document.title = `LikeMe • Authentication`;
  const [hasAccount, setHasAccount] = useState(!true);
  return (
    <div className="auth">
      <h1>LIKE ME</h1>
      <div className="auth__main">
        {!hasAccount ? (
          <Register setHasAccount={setHasAccount} />
        ) : (
          <Login setHasAccount={setHasAccount} />
        )}
      </div>
    </div>
  );
};

export default Auth;
