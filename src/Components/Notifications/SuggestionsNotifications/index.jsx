import React from "react";
import { Avatar } from "@material-ui/core";

import "./SuggestionsNotifications.css";
const SuggestionsNotifications = () => {
  return (
    <div className="suggestion__notifications">
      <Avatar className="suggestion__notifications__avatar" />
      <div className="suggestion__notifications__center">
        <h1>Suggestion</h1>
        <p>Follow username2 she's desperate.</p>
      </div>
      <div className="suggestion__notifications__right">
        <h1>Robot</h1>
        <p>time</p>
      </div>
    </div>
  );
};

export default SuggestionsNotifications;
