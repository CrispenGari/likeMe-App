import { Avatar } from "@material-ui/core";
import React from "react";
// import { BsFillPersonPlusFill } from "react-icons/bs";
import "./FollowerNotification.css";
import { VerifiedBadge } from "../../Common";
import helperFunctions from "../../../utils/helperfunctions";
import { useSelector } from "react-redux";
import { useFollowings, useFollowers } from "../../../hooks";
import firebase from "../../../backend";
import { useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
const FollowersNotification = ({ notification }) => {
  useFollowings(notification?.userId);
  useFollowers(notification?.userId);

  const history = useHistory();

  const user = useSelector((state) => state.user);

  const currentUser = useSelector((state) =>
    state?.users?.find((__user) => __user?.id === user?.uid)
  );
  const _user = useSelector((state) => state.users)?.find(
    (__user) => __user?.id === notification?.userId
  );
  const openNotification = (notification) => {
    helperFunctions.readNotification(user, notification);
  };

  const followers = useSelector((state) => state.followers)?.find(
    (__user) => __user?.id === user?.uid
  );
  const followings = useSelector((state) => state.followings)?.find(
    (__user) => __user?.id === user?.uid
  );

  const openUserProfile = () => {
    history.push(`/profile/${notification?.userId}/${uuid_v4()}`);
  };

  const followBack = () => {
    if (_user && currentUser) {
      firebase.db
        .collection("users")
        .doc(_user?.id)
        .collection("followers")
        .doc(currentUser?.id)
        .set({
          displayName: currentUser?.displayName,
          email: currentUser?.email,
          userId: currentUser?.id,
          birthday: currentUser?.birthday ? currentUser?.birthday : null,
          phoneNumber: currentUser?.phoneNumber
            ? currentUser?.phoneNumber
            : null,
          photoURL: currentUser?.photoURL ? currentUser?.photoURL : null,
          isVerified: currentUser?.isVerified ? true : false,
          timestamp: firebase.timestamp,
        })
        .then(() => {
          helperFunctions.notifyToWhomItMayConcern(
            user,
            "followed you back.",
            null,
            _user,
            "follower"
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {});
      firebase.db
        .collection("users")
        .doc(currentUser?.id)
        .collection("followings")
        .doc(_user?.id)
        .set({
          displayName: _user?.displayName,
          email: _user?.email,
          userId: _user?.id,
          birthday: _user?.birthday ? _user?.birthday : null,
          phoneNumber: _user?.phoneNumber ? _user?.phoneNumber : null,
          photoURL: _user?.photoURL ? _user?.photoURL : null,
          isVerified: _user?.isVerified ? true : false,
          timestamp: firebase.timestamp,
        })
        .catch((error) => console.error(error))
        .finally(() => {});
    } else {
      return;
    }
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
        <h1 onClick={openUserProfile}>
          @{notification?.displayName}
          {notification?.userVerified ? <VerifiedBadge size={14} /> : null}
        </h1>
        <p>{notification?.message}</p>
      </div>

      <div className="follower__notifications__right">
        {/* <BsFillPersonPlusFill className="follower__notifications__icon" /> */}
        <div className="follower__notifications__button">
          {Boolean(followers) === Boolean(followings) ? (
            <p>friends</p>
          ) : Boolean(followers) === true && Boolean(followings) === false ? (
            <p>following</p>
          ) : (
            <button onClick={followBack} title="follow back">
              follow back
            </button>
          )}
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
