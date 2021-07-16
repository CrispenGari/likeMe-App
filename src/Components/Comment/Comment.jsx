import React from "react";
import "./Comment.css";
import { Avatar, IconButton } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
import { Delete } from "@material-ui/icons";
import firebase from "../../backend";
const Comment = ({ comment, postId }) => {
  const deleteComment = () => {
    firebase.db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comment?.id)
      .delete()
      .then(() => console.clear());
  };
  return (
    <div className="comment">
      <div className="comment__top">
        <Avatar
          className="comment__avatar"
          src={comment?.data?.userAvatar}
          alt={comment?.data?.username}
        />
        <div className="comment__info">
          <h1>
            {comment?.data?.username}{" "}
            <HiBadgeCheck className="comment__high__badge" />
          </h1>
          <p>{comment?.data.comment} </p>
        </div>
      </div>
      <div className="comment__bottom">
        <IconButton className="comment__delete__button" onClick={deleteComment}>
          <Delete className="comment__delete__icon" />
        </IconButton>{" "}
        <small>• time</small>
      </div>
    </div>
  );
};

export default Comment;
