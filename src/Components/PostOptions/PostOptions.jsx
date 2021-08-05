import React from "react";
import "./PostOptions.css";
import { useSelector } from "react-redux";
import { useFollowings, useFollowers } from "../../hooks";
import firebase from "../../backend";

import helperFunctions from "../../utils/helperfunctions";
const PostOptions = ({ post, setAnchorEl }) => {
  const user = useSelector((state) => state.user);

  const currentUser = useSelector((state) =>
    state?.users?.find((__user) => __user?.id === user?.uid)
  );
  useFollowings(post?.userId);
  useFollowers(post?.userId);

  const followers = useSelector((state) => state.followers)?.find(
    (__user) => __user?.id === user?.uid
  );
  const _user = useSelector((state) => state.users)?.find(
    (__user) => __user?.id === post?.userId
  );

  const deletePost = () => {
    helperFunctions.deletePost(post?.imageURL, "posts", post);
    setAnchorEl(null);
  };
  const followUser = () => {
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
  const unFollowUser = () => {
    if (_user && currentUser) {
      firebase.db
        .collection("users")
        .doc(_user?.id)
        .collection("followers")
        .doc(currentUser?.id)
        .delete()
        .finally(() => {});
      firebase.db
        .collection("users")
        .doc(currentUser?.id)
        .collection("followings")
        .doc(_user?.id)
        .delete()
        .finally(() => {});
    } else {
      return;
    }
  };
  return (
    <div className="postoptions">
      {Boolean(followers) ? (
        <button onClick={unFollowUser} disabled={user?.uid === post?.userId}>
          unfollow
        </button>
      ) : (
        <button onClick={followUser} disabled={user?.uid === post?.userId}>
          follow
        </button>
      )}
      <button onClick={deletePost} disabled={user?.uid !== post?.userId}>
        Delete
      </button>
      <button disabled={user?.uid === post?.userId}>
        Turn On Notifications
      </button>
      <button disabled={user?.uid === post?.userId}>Mute</button>
      <hr />
      <button>Share</button>
      <button>Download</button>
    </div>
  );
};

export default PostOptions;
