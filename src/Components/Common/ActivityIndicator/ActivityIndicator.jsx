import "./ActivityIndicator.css";
import React from "react";
const ActivityIndicator = ({ size, content }) => {
  return (
    <div
      className="activity__indicator"
      style={
        size
          ? {
              width: size,
              height: size,
            }
          : {}
      }
    >
      <p>{content ? content : null}</p>
    </div>
  );
};
export default ActivityIndicator;
