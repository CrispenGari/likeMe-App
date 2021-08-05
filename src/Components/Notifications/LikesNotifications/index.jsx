import React from "react";
import { Avatar } from "@material-ui/core";

import "./LikesNotifications.css";
const LikesNotifications = () => {
  return (
    <div className="like__notifications">
      <Avatar className="like__notifications__avatar" />
      <div className="like__notifications__center">
        <h1>@username2</h1>
        <p>Liked your post</p>
      </div>
      <div className="like__notifications__right">
        <h1>Reaction</h1>
        <p>time</p>
      </div>
    </div>
  );
};

export default LikesNotifications;
