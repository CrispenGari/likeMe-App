import React from "react";
import { Avatar } from "@material-ui/core";
import "./LikesNotifications.css";
import helperFunctions from "../../../utils/helperfunctions";
import { Favorite } from "@material-ui/icons";
import { VerifiedBadge } from "../../Common";
const LikesNotifications = ({ notification }) => {
  return (
    <div
      className={`like__notifications ${
        notification?.viewed ? "" : "new-notification"
      }`}
    >
      <Avatar
        src={notification?.photoURL ? notification?.photoURL : null}
        alt={notification?.displayName}
        className="like__notifications__avatar"
      />
      <div className="like__notifications__center">
        <h1>
          @{notification?.displayName}
          {notification?.userVerified ? <VerifiedBadge size={14} /> : null}
        </h1>
        <p>{notification?.message}</p>
      </div>
      <div className="like__notification__post">
        <img src={notification?.postUrl} alt="" />
      </div>
      <div className="like__notifications__right">
        <Favorite className="like__notifications__icon" />
        <p>
          {helperFunctions.timeString(
            helperFunctions.timestampToTime(notification?.timestamp)
          )}
        </p>
      </div>
    </div>
  );
};

export default LikesNotifications;
