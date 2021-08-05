import { Avatar } from "@material-ui/core";
import React from "react";
// import { BsFillPersonPlusFill } from "react-icons/bs";
import "./FollowerNotification.css";
import { VerifiedBadge } from "../../Common";
import helperFunctions from "../../../utils/helperfunctions";
import { useSelector } from "react-redux";

const FollowersNotification = ({ notification }) => {
  const user = useSelector((state) => state.user);
  const openNotification = (notification) => {
    helperFunctions.readNotification(user, notification);
  };

  return (
    <div
      className={`follower__notifications ${
        notification?.viewed ? "" : "new-notification"
      }`}
      onClick={() => openNotification(notification)}
    >
      <Avatar
        src={notification?.photoURL ? notification?.photoURL : null}
        alt={notification?.displayName}
        className="follower__notifications__avatar"
      />
      <div className="follower__notifications__center">
        <h1>
          @{notification?.displayName}
          {notification?.userVerified ? <VerifiedBadge size={14} /> : null}
        </h1>
        <p>{notification?.message}</p>
      </div>

      <div className="follower__notifications__right">
        {/* <BsFillPersonPlusFill className="follower__notifications__icon" /> */}
        <div className="follower__notifications__button">
          <button title="follow back">follow back</button>
        </div>
        <p>
          {helperFunctions.timeString(
            helperFunctions.timestampToTime(notification?.timestamp)
          )}
        </p>
      </div>
    </div>
  );
};

export default FollowersNotification;
