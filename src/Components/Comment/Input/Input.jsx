import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import firebase from "../../../backend";
import { ActivityIndicator } from "../../Common";
import helperFunctions from "../../../utils/helperfunctions";
import "./Input.css";

const Input = ({ post, comment }) => {
  const user = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const currentUser = useSelector((state) => state.users)?.find(
    (_user) => _user?.id === user?.uid
  );
  const [loading, setLoading] = useState("");

  const replyComment = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .doc(comment?.id)
      .collection("innerComment")
      .add({
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        timestamp: firebase.timestamp,
        userId: user?.uid,
        comment: commentText,
        userVerified: currentUser?.userVerified ?? false,
      })
      .then(() => {
        if (user?.uid !== comment?.userId) {
          helperFunctions.notifyToWhomItMayConcern(
            user,
            `replied to you comment on ${
              user?.uid === post?.userId ? "your" : post?.displayName + "'s"
            } post.`,
            post,
            null,
            "comment"
          );
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setCommentText("");
        setLoading(false);
      });
  };
  return (
    <form onSubmit={replyComment} className="comment__input__inline">
      <input
        placeholder={`reply to @${comment?.displayName}...`}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit" disabled={!commentText}>
        {loading ? (
          <ActivityIndicator size={15} />
        ) : (
          <MdSend className="comment__input__inline__send__icon" />
        )}
      </button>
    </form>
  );
};

export default Input;
