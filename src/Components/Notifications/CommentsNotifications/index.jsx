import { Avatar } from "@material-ui/core";
import React from "react";
import { VerifiedBadge } from "../../Common";
import helperFunctions from "../../../utils/helperfunctions";
import "./CommentsNotifications.css";
import { FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
const CommentsNotifications = ({ notification }) => {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const openNotification = (notification) => {
    helperFunctions.readNotification(user, notification);
  };

  const openUserProfile = () => {
    history.push(`/profile/${notification?.userId}/${uuid_v4()}`);
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
        <h1 onClick={openUserProfile}>
          @{notification?.displayName}
          {notification?.userVerified ? <VerifiedBadge size={14} /> : null}
        </h1>
        <p>
          {notification?.message?.split(".")[0] + "."}
          <span>{notification?.message?.split(".")[1]}</span>
        </p>
      </div>
      {notification?.postUrl && (
        <div className="comment__notification__post">
          <img src={notification?.postUrl} alt="" />
        </div>
      )}
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
