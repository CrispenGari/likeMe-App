import { Avatar } from "@material-ui/core";
import React from "react";
import { VerifiedBadge } from "../../Common";
import helperFunctions from "../../../utils/helperfunctions";
import "./CommentsNotifications.css";
import { FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
const CommentsNotifications = ({ notification }) => {
  const user = useSelector((state) => state.user);
  const openNotification = (notification) => {
    helperFunctions.readNotification(user, notification);
  };
  return (
    <div
      onClick={() => openNotification(notification)}
      className={`comment__notifications ${
        notification?.viewed ? "" : "new-notification"
      }`}
    >
      <Avatar
        src={notification?.photoURL ? notification?.photoURL : null}
        alt={notification?.displayName}
        className="comment__notifications__avatar"
      />
      <div className="comment__notifications__center">
        <h1>
          @{notification?.displayName}
          {notification?.userVerified ? <VerifiedBadge size={14} /> : null}
        </h1>
        <p>{notification?.message}</p>
      </div>
      <div className="comment__notification__post">
        <img src={notification?.postUrl} alt="" />
      </div>
      <div className="comment__notifications__right">
        <FaComments className="comment__notifications__icon" />
        <p>
          {helperFunctions.timeString(
            helperFunctions.timestampToTime(notification?.timestamp)
          )}
        </p>
      </div>
    </div>
  );
};

export default CommentsNotifications;
