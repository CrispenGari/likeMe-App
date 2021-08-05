import "./ProfileButtons.css";
import React, { useState } from "react";
import firebase from "../../backend";
import { ActivityIndicator } from "../Common";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFollowers } from "../../hooks";
import helperFunctions from "../../utils/helperfunctions";

const ProfileButtons = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const { uid } = useParams();
  const currentUser = useSelector((state) =>
    state?.users?.find((__user) => __user?.id === user?.uid)
  );
  const _user = useSelector((state) =>
    state?.users?.find((__user) => __user?.id === uid)
  );
  // Fetch followers and followings
  useFollowers(uid);
  const follower = useSelector((state) =>
    state.followers?.find((__user) => __user?.id === currentUser?.id)
  );

  const followUser = () => {
    setLoading(true);
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
            "started following you.",
            null,
            _user,
            "follower"
          );
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
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
        .finally(() => setLoading(false));
    } else {
      return setLoading(false);
    }
  };
  const unFollowUser = () => {
    setLoading(true);
    if (_user && currentUser) {
      firebase.db
        .collection("users")
        .doc(_user?.id)
        .collection("followers")
        .doc(currentUser?.id)
        .delete()
        .finally(() => setLoading(false));
      firebase.db
        .collection("users")
        .doc(currentUser?.id)
        .collection("followings")
        .doc(_user?.id)
        .delete()
        .finally(() => setLoading(false));
    } else {
      return setLoading(false);
    }
  };
  return (
    <div className="profile__buttons">
      {follower ? (
        <button onClick={unFollowUser}>
          unfollow
          {loading ? <ActivityIndicator size={15} /> : null}
        </button>
      ) : (
        <button onClick={followUser} className="profile__button__follow">
          follow
          {loading ? <ActivityIndicator size={15} /> : null}
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;
