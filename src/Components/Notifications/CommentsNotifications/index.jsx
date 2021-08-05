import { Avatar } from "@material-ui/core";
import React from "react";

import "./CommentsNotifications.css";
const CommentsNotifications = () => {
  return (
    <div className="comment__notifications">
      <Avatar className="comment__notifications__avatar" />
      <div className="comment__notifications__center">
        <h1>@username2</h1>
        <p>commented on your posts</p>
      </div>
      <div className="comment__notifications__right">
        <h1>Comment</h1>
        <p>time</p>
      </div>
    </div>
  );
};

export default CommentsNotifications;
