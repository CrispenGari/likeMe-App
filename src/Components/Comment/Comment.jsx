import React, { useState } from "react";
import "./Comment.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import firebase from "../../backend";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useSelector } from "react-redux";
import helperFunctions from "../../utils/helperfunctions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";

import { ActivityIndicator, VerifiedBadge } from "../Common";
const Comment = ({ comment, post }) => {
  const user = useSelector((state) => state.user);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [time, setTime] = React.useState(null);
  const [likes, setLikes] = useState([]);
  const history = useHistory();
  const openUserProfile = () => {
    history.push(`/profile/${comment?.userId}/${uuid_v4()}`);
  };
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .doc(comment?.id)
      .collection("likes")
      .orderBy("timestamp", "desc")
      .onSnapshot((likes) => {
        setLikes(likes.docs.map((like) => ({ id: like.id, ...like.data() })));
      });
    return () => {
      unsubscribe();
    };
  }, [post?.id, comment?.id]);
  const handleLike = () => {
    let likeId = "";
    likes.forEach((like) => {
      if (like?.userId === user?.uid) {
        likeId = like?.id;
      }
    });
    if (likeId) {
      // remove it from the database
      firebase.db
        .collection("posts")
        .doc(post?.id)
        .collection("comments")
        .doc(comment?.id)
        .collection("likes")
        .doc(likeId)
        .delete()
        .then(() => {
          helperFunctions.deleteNotification(
            user,
            {
              postUrl: post?.imageURL,
              caption: post?.caption,
              postId: post?.id,
              userId: comment?.userId,
            },
            "reaction"
          );
        })
        .catch((error) => console.log(error));
      return;
    } else {
      // add it to the database
      firebase.db
        .collection("posts")
        .doc(post?.id)
        .collection("comments")
        .doc(comment?.id)
        .collection("likes")
        .add({
          email: user?.email,
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          timestamp: firebase.timestamp,
          userId: user?.uid,
        })
        .then(() => {
          if (user?.uid !== post?.userId) {
            helperFunctions.notifyToWhomItMayConcern(
              user,
              "liked your comment.",
              {
                postUrl: post?.imageURL,
                caption: post?.caption,
                postId: post?.id,
                userId: comment?.userId,
              },
              null,
              "reaction"
            );
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {});
      return;
    }
  };

  useEffect(() => {
    if (comment?.timestamp) {
      const _time = helperFunctions.timeString(
        helperFunctions.timestampToTime(comment?.timestamp)
      );
      setTime(_time);
    }
  }, [comment]);
  const deleteComment = () => {
    setDeleteLoading(true);
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .doc(comment?.id)
      .delete()
      .then(() => {})
      .finally(() => setDeleteLoading(false));
  };
  const openTag = (cap) => {};
  return (
    <div className="comment">
      <div className="comment__top">
        <Avatar
          className="comment__avatar"
          src={comment?.photoURL}
          alt={comment?.displayName}
        />
        <div>
          <p>
            <span
              className="comment__username"
              onClick={() => {
                openUserProfile();
              }}
            >
              @
              {comment?.displayName === user?.displayName
                ? "you"
                : comment?.displayName}
              {comment?.userVerified ? <VerifiedBadge /> : null}
            </span>

            <p className="comment__caption">
              {comment?.comment.split(" ").map((cap, i) => {
                if (cap.startsWith("#") || cap.startsWith("@")) {
                  return (
                    <span
                      onClick={() => openTag(cap)}
                      key={i}
                      className="post__hash__tag"
                    >
                      {cap}
                    </span>
                  );
                } else {
                  return <span key={i}>{cap}</span>;
                }
              })}
            </p>
          </p>
          <div className="comment__controls">
            <div className="comment__controls__right">
              <div>{time ? time : <ActivityIndicator size={5} />}</div>

              <IconButton title="react" onClick={handleLike}>
                {likes.filter((like) => like?.email === user?.email).length !==
                0 ? (
                  <Favorite className="comment__icon__like " />
                ) : (
                  <FavoriteBorder className="comment__icon" />
                )}
              </IconButton>
              {deleteLoading ? (
                <ActivityIndicator size={10} />
              ) : (
                <IconButton
                  disabled={user?.uid !== comment?.userId}
                  title="delete"
                  onClick={deleteComment}
                >
                  <Delete className="comment__icon" />
                </IconButton>
              )}
            </div>
            <p>
              <span>{likes?.length}</span>
              <Favorite className="comment__icon__like" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
