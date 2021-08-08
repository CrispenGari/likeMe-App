import "./SampleComments.css";
import React from "react";

const SampleComments = ({ comments, setOpenComments }) => {
  return (
    <div className="sample__comments">
      <h1 onClick={() => setOpenComments(true)}>Read comments</h1>
    </div>
  );
};

export default SampleComments;
