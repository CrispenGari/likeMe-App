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
import { ActivityIndicator } from "../Common";
import Image from "../Image/Image";
import helperFunctions from "../../utils/helperfunctions";
const Post = ({ post, setShowNotification }) => {
  const time = helperFunctions.timeString(
    helperFunctions.timestampToTime(post.timestamp)
  );
  const [postSize, setPostSize] = useState(null);
  const [openPicture, setOpenPicture] = useState(false);
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLike, setOpenLike] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openProfile = () => {
    history.push(`/profile/${post?.userId}`);
  };
  const openChat = () => {
    history.replace(`/chat/${post?.userId}`);
  };
  const openTag = (cap) => {
    console.log(cap);
  };
  useEffect(() => {
    helperFunctions.postSize(post?.imageURL).then((res) => setPostSize(res));
  }, [post]);

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("likes")
      .orderBy("timestamp", "desc")
      .onSnapshot((likes) => {
        setLikes(likes.docs.map((like) => ({ id: like.id, ...like.data() })));
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
      });
  };
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
        .collection("likes")
        .doc(likeId)
        .delete()
        .then(() => {})
        .catch((error) => console.log(error));
      return;
    } else {
      // add it to the database
      firebase.db
        .collection("posts")
        .doc(post?.id)
        .collection("likes")
        .add({
          email: user?.email,
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          timestamp: firebase.timestamp,
          userId: user?.uid,
        })
        .then(() => {})
        .catch((error) => console.log(error))
        .finally(() => {});
      return;
    }
  };
  return (
    <div className="post">
      <Image
        image={image}
        setImage={setImage}
        open={openPicture}
        setOpen={setOpenPicture}
      />
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
          src={post?.photoURL}
          alt={post?.displayName}
          onClick={openProfile}
          onMouseEnter={() => {
            setTimeout(() => {
              setImage({ ...post, picture: "avatar" });
              setOpenPicture(true);
            }, 1500);
          }}
        />
        <div className="post__info">
          <div>
            <h1 onClick={openProfile}>
              {post?.displayName === user?.displayName
                ? "You"
                : post?.displayName}
              {post?.userVerified ? (
                <HiBadgeCheck className="post__high__badge" />
              ) : null}
            </h1>
            <small>•</small> <small>{time}</small>
          </div>
          <p className={`post__category__badge`}>
            {post?.location && (
              <span className="post__location">
                {post?.location?.split(", ")[1] + " • "}
              </span>
            )}
            {post?.category}
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
      <div
        className="post__center"
        onClick={() => {
          setImage({ ...post, picture: "post" });
          setOpenPicture(true);
        }}
      >
        <div className="post__center__likes"></div>
        <img src={post?.imageURL} alt="post" loading="lazy" />
      </div>
      <p className="post__caption">
        {post?.caption.split(" ").map((cap, i) => {
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
      <div className="post__bottom">
        <div className="post__bottom__buttons">
          <div className="post__bottom__button__container">
            <IconButton
              className="post__icon__button__message"
              title="download"
            >
              <GetApp className="post__icon__download" />
            </IconButton>
            <div className="post__bottom__size">
              {postSize === null ? <ActivityIndicator size={5} /> : postSize}
            </div>
          </div>
          <div className="post__bottom__button__container">
            <IconButton
              className="post__icon__button__message"
              title="message"
              onClick={openChat}
              // You can not text yourself
              disabled={user?.uid === post?.userId}
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
            <p>{comments.length}</p>
          </div>
          <div className="post__bottom__button__container">
            <IconButton
              onClick={handleLike}
              className="post__icon__button__like"
            >
              {likes.filter((like) => like?.email === user?.email).length !==
              0 ? (
                <Favorite className="post__icon__like" />
              ) : (
                <FavoriteBorder className="post__icon__unlike" />
              )}
            </IconButton>
            <p onClick={() => setOpenLike(true)}>{likes.length}</p>
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
