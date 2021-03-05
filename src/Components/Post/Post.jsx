import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  FavoriteBorder,
  Favorite,
  Message,
  MoreVert,
  GetApp,
} from "@material-ui/icons";

import { HiBadgeCheck } from "react-icons/hi";
import { Comments } from "../../Components";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import fb from "firebase";
const Post = ({ post }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("likes")
      .onSnapshot((snapshot) => {
        setLikes(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    likes.forEach((like) => {
      if (like.data.userEmail === user?.email) {
        setLiked(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [post?.id, likes, user?.email]);

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .doc(post.id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, [post?.id]);
  const postComment = () => {
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .add({
        username: user?.displayName,
        userEmail: user?.email,
        userId: user.uid,
        userAvatar: user?.photoURL,
        comment: comment,
        timestamp: fb.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.clear())
      .catch((error) => console.clear())
      .finally(() => setComment(""));
  };
  const handleLike = () => {
    let userLike = "";
    likes.forEach((like) => {
      if (like?.data.userEmail === user?.email) {
        userLike = like?.id;
      }
    });
    if (userLike) {
      // remove it from the database
      firebase.db
        .collection("posts")
        .doc(post?.id)
        .collection("likes")
        .doc(userLike)
        .delete()
        .then(() => console.clear())
        .catch((error) => console.log(error))
        .finally(() => setLiked(false));
    } else {
      // add it to the database
      firebase.db
        .collection("posts")
        .doc(post?.id)
        .collection("likes")
        .add({
          userEmail: user?.email,
          userAvatar: user?.photoURL,
          username: user?.displayName,
        })
        .then(() => console.clear())
        .catch((error) => console.log(error))
        .finally(() => setLiked(true));
    }
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar
          className="post__avatar"
          src={post?.data?.userAvatar}
          alt={post?.data?.username}
        />
        <div className="post__info">
          <div>
            <h1>
              {post?.data?.username === user?.displayName
                ? "You"
                : post?.data?.username}{" "}
              <HiBadgeCheck className="post__high__badge" />
            </h1>{" "}
            <small>•</small> <small>2hrs ago</small>
            <small>•</small>
            <small
              className={`post__category__badge ${
                post?.data?.category === "complicated"
                  ? "post__category__badge--complicated"
                  : post?.data?.category === "searching"
                  ? "post__category__badge--searching"
                  : post?.data?.category === "single"
                  ? "post__category__badge--single"
                  : ""
              }`}
            >
              {post?.data?.category}
            </small>
          </div>
          <p>
            {post?.data?.caption.split(" ").map((cap) => {
              if (cap.startsWith("#")) {
                return <span className="post__hash__tag">{cap}</span>;
              } else {
                return <span>{cap}</span>;
              }
            })}
          </p>
        </div>
        <IconButton className="post__iconButton">
          <MoreVert />
        </IconButton>
      </div>
      <div className="post__center">
        <div className="post__center__likes" onDoubleClick={handleLike}>
          {likes.length === 0 ? (
            <FavoriteBorder className="post__icon__unlike__number" />
          ) : (
            <Favorite className="post__icon__unlike__number" />
          )}

          <h1>{likes.length}</h1>
        </div>
        <img src={post?.data?.imageURL} alt="post" loading="lazy" />
      </div>
      <div className="post__bottom">
        <div className="post__bottom__buttons">
          <IconButton className="post__icon__button__message" title="download">
            <GetApp className="post__icon__download" />
          </IconButton>
          <IconButton className="post__icon__button__message" title="message">
            <Message className="post__icon__message" />
          </IconButton>
          <IconButton onClick={handleLike} className="post__icon__button__like">
            {liked ? (
              <Favorite className="post__icon__like" />
            ) : (
              <FavoriteBorder className="post__icon__unlike" />
            )}
          </IconButton>
        </div>
        <div className="post__bottom__comment__input">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Type your comment..."
          />
          <button disabled={!comment} onClick={postComment}>
            post
          </button>
        </div>
        <div className="post__buttom__comment__container">
          {!showComments && comments.length > 0 && (
            <button onClick={() => setShowComments(true)}>Read Comments</button>
          )}
          {comments.length <= 0 && <h1>No Comments for this post</h1>}
          {showComments && (
            <Comments
              comments={comments}
              setShowComments={setShowComments}
              postId={post?.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
