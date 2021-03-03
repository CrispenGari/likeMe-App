import React from "react";
import "./Welcome.css";
import { AiFillLike } from "react-icons/ai";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__main">
        <div className="welcome__loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>
          Welcome to the <span>LikeMe</span>, where you will find your love
          partner.
        </p>
        <h1>
          <AiFillLike className="welcome__like__icon" />
          <span>M</span>
          <span>e</span>
        </h1>
        <small>Developed by Crispen Gari</small>
      </div>
    </div>
  );
};

export default Welcome;
