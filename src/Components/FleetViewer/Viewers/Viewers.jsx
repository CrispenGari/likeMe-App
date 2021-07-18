import "./Viewers.css";
import React from "react";
import Viewer from "../Viewer/Viewer";
const Viewers = () => {
  return (
    <div className="viewers">
      <h1>35 viewers</h1>
      <div className="viewers__container">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Viewer key={i} />
          ))}
      </div>
    </div>
  );
};

export default Viewers;
