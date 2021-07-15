import "./ActivityIndicator.css";
import React from "react";
const ActivityIndicator = ({ size }) => {
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
    ></div>
  );
};
export default ActivityIndicator;
