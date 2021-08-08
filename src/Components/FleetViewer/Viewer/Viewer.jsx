import "./Viewer.css";
import React from "react";
import { Avatar } from "@material-ui/core";
const Viewer = ({ viewer }) => {
  return (
    <div className="viewer" title={viewer?.displayName}>
      <Avatar
        className="viewer__avatar"
        alt={viewer?.displayName}
        src={viewer?.photoURL}
      />
    </div>
  );
};

export default Viewer;
