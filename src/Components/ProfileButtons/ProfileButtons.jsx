import "./ProfileButtons.css";
import React, { useEffect, useState } from "react";
import firebase from "../../backend";
import { ActivityIndicator } from "../Common";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const unFollowUser = () => {
    setLoading(true);
    firebase.db
      .collection("users")
      .doc(uid)
      .collection("followers")
      .doc(currentUser?.id)
      .set({
        ...currentUser,
        timestamp: firebase.timestamp,
      })
      .finally(() => setLoading(false));
    firebase.db
      .collection("users")
      .doc(currentUser?.id)
      .collection("followings")
      .doc(currentUser?.id)
      .set({
        ..._user,
        timestamp: firebase.timestamp,
      })
      .finally(() => setLoading(false));
  };
  const followUser = () => {
    setLoading(true);
    firebase.db
      .collection("users")
      .doc(uid)
      .collection("followers")
      .doc(currentUser?.id)
      .delete()
      .finally(() => setLoading(false));
    firebase.db
      .collection("users")
      .doc(currentUser?.id)
      .collection("followings")
      .doc(currentUser?.id)
      .delete()
      .finally(() => setLoading(false));
  };

  return (
    <div className="profile__buttons">
      <button onClick={followUser}>
        follow
        {loading ? <ActivityIndicator size={15} /> : null}
      </button>
      <button onClick={unFollowUser}>
        unfollow
        {loading ? <ActivityIndicator size={15} /> : null}
      </button>
    </div>
  );
};

export default ProfileButtons;
