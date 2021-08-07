import "./Input.css";

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../../../backend";
import helperFunctions from "../../../utils/helperfunctions";
import { ActivityIndicator } from "../../Common";
const Input = ({ post }) => {
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.users)?.find(
    (_user) => _user?.id === user?.uid
  );
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const postComment = (e) => {
    e.preventDefault();
    setPosting(true);
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .add({
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        timestamp: firebase.timestamp,
        userId: user?.uid,
        comment: comment,
        userVerified: currentUser?.userVerified ?? false,
      })
      .then(() => {
        if (user?.uid !== post?.userId) {
          helperFunctions.notifyToWhomItMayConcern(
            user,
            "commented on your post.",
            post,
            null,
            "comment"
          );
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setComment("");
        setPosting(false);
      });
  };

  return (
    <form className="comment__input">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={`type your comment @${post?.displayName}...`}
      />
      <button onClick={postComment} type="submit" disabled={!comment}>
        post
        {posting ? <ActivityIndicator size={15} /> : null}
      </button>
    </form>
  );
};

export default Input;
