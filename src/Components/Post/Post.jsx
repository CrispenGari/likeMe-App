import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar, IconButton, Popover, Modal } from "@material-ui/core";
import {
  FavoriteBorder,
  Favorite,
  Message,
  MoreVert,
  GetApp,
} from "@material-ui/icons";

import { HiBadgeCheck } from "react-icons/hi";
import { FaComments } from "react-icons/fa";
import { Comments, PostOptions, Likes } from "../../Components";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import fb from "firebase";
import { useHistory } from "react-router-dom";
import timeFunct from "../../utils/time";
import boopSfx from "../../sounds/post1.wav";
import like from "../../sounds/like.mp3";
import useSound from "use-sound";

const Post = ({ post, setShowNotification }) => {
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLike, setOpenLike] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postTime, setPostTime] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [play] = useSound(boopSfx);
  const [playLike] = useSound(like);
  const openPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openProfile = () => {
    history.push(`/profile/${post?.data?.userId}`);
  };
  const openChat = () => {
    history.replace(`/chat/${post?.data?.userId}`);
  };
  useEffect(() => {
    setPostTime(timeFunct(post?.data?.timestamp));
  }, [post]);

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
    return () => {
      unsubscribe();
    };
  }, [post?.id]);

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
      .then(() => {})
      .catch((error) => console.log(error))
      .finally(() => {
        setComment("");
        play();
      });
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
        .then(() => {})
        .catch((error) => console.log(error));
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
        .then(() => {})
        .catch((error) => console.log(error))
        .finally(() => {
          playLike();
        });
    }
  };

  return (
    <div className="post">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="post__comments__modal"
      >
        <Comments
          comments={comments}
          setComment={setComment}
          setOpen={setOpen}
          postComment={postComment}
          comment={comment}
        />
      </Modal>
      <Modal
        open={openLike}
        onClose={() => setOpenLike(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="post__comments__modal"
      >
        <Likes likes={likes} setOpenLike={setOpenLike} />
      </Modal>
      <div className="post__top">
        <Avatar
          className="post__avatar"
          src={post?.data?.userAvatar}
          alt={post?.data?.username}
          onClick={openProfile}
        />
        <div className="post__info">
          <div>
            <h1 onClick={openProfile}>
              {post?.data?.userId === user?.uid
                ? "You"
                : String(post?.data?.username).split(/\s/).join("_")}
              <HiBadgeCheck className="post__high__badge" />
            </h1>
            <small>•</small> <small>{postTime}</small>
          </div>
          <p className={`post__category__badge`}>
            <span className="post__location">
              {post?.data?.location?.split(", ")[1]}
            </span>
            {" • " + post?.data?.category}
          </p>
        </div>
        <div>
          <IconButton className="post__iconButton" onClick={openPop}>
            <MoreVert />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <PostOptions
              setShowNotification={setShowNotification}
              post={post}
              setAnchorEl={setAnchorEl}
            />
          </Popover>
        </div>
      </div>
      <div className="post__center">
        <div className="post__center__likes" onDoubleClick={handleLike}></div>
        <img src={post?.data?.imageURL} alt="post" loading="lazy" />
      </div>
      <p className="post__caption">
        {post?.data?.caption.split(" ").map((cap, i) => {
          if (cap.startsWith("#")) {
            return (
              <span key={i} className="post__hash__tag">
                {cap}
              </span>
            );
          } else {
            return <span key={i}>{cap}</span>;
          }
        })}
      </p>
      <div className="post__bottom">
        <div className="post__bottom__buttons">
          <div className="post__bottom__button__container">
            <IconButton
              className="post__icon__button__message"
              title="download"
            >
              <GetApp className="post__icon__download" />
            </IconButton>
          </div>
          <div className="post__bottom__button__container">
            <IconButton
              className="post__icon__button__message"
              title="message"
              onClick={openChat}
              // You can not text yourself
              disabled={user?.uid === post?.data?.userId}
            >
              <Message className="post__icon__message" />
            </IconButton>
          </div>
          <div
            className="post__bottom__button__container"
            onClick={() => setOpen(true)}
          >
            <IconButton className="post__icon__button__message" title="comment">
              <FaComments className="post__icon__comments" />
            </IconButton>
            <h1>{comments.length}</h1>
          </div>
          <div className="post__bottom__button__container">
            <IconButton
              onClick={handleLike}
              className="post__icon__button__like"
            >
              {likes.filter((like) => like.data.userEmail === user?.email)
                .length !== 0 ? (
                <Favorite className="post__icon__like" />
              ) : (
                <FavoriteBorder className="post__icon__unlike" />
              )}
            </IconButton>
            <h1 onClick={() => setOpenLike(true)}>{likes.length}</h1>
          </div>
        </div>
        <div className="post__bottom__comment__input">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder={
              comments?.length === 0
                ? "Be the first one to comment..."
                : "Type your comment..."
            }
          />
          <button disabled={!comment} onClick={postComment}>
            post
          </button>
        </div>
        <div className="post__bottom__comment__container">
          {comments?.length > 0 ? (
            <button onClick={() => setOpen(true)}>Read Comments</button>
          ) : (
            <h1>No Comments</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
