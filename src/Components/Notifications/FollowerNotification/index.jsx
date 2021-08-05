import { Avatar } from "@material-ui/core";
import React from "react";

import "./FollowerNotification.css";
const FollowersNotification = () => {
  return (
    <div className="follower__notifications">
      <Avatar className="follower__notifications__avatar" />
      <div className="follower__notifications__center">
        <h1>@username2</h1>
        <p>commented is now following you</p>
      </div>
      <div className="follower__notifications__right">
        <h1>Follower</h1>
        <p>time</p>
      </div>
    </div>
  );
};

export default FollowersNotification;
