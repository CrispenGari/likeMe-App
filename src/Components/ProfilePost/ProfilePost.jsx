import "./ProfilePost.css";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import helperFunctions from "../../utils/helperfunctions";
import Image from "../Image/Image";
import firebase from "../../backend";
import { FaComments } from "react-icons/fa";
import { useEffect } from "react";
import { Comments } from "../../Components";

const ProfilePost = ({ post }) => {
  const time = helperFunctions.timeString(
    helperFunctions.timestampToTime(post.timestamp)
  );
  const [image, setImage] = useState(null);
  const [openPicture, setOpenPicture] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  useEffect(() => {
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("likes")
      .get()
      .then((likes) => setLikesCount(likes.docs.length));
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .get()
      .then((comments) =>
        setComments(
          comments.docs.map((doc) => ({ id: doc?.id, ...doc.data() }))
        )
      );
  }, [post]);

  useEffect(() => {
    if (openComments === true) {
      setImage(null);
      setOpenPicture(false);
    }
  }, [openComments]);
  return (
    <div className="profile__post">
      <Comments
        post={post}
        comments={comments}
        openComments={openComments}
        setOpenComments={setOpenComments}
      />
      <Image
        image={image}
        setImage={setImage}
        open={openPicture}
        setOpen={setOpenPicture}
      />
      <div
        className="profile__post__image__cover"
        onClick={() => {
          if (openComments === false) {
            setImage({ ...post, picture: "post" });
            setOpenPicture(true);
          }
        }}
      >
        <div className="profile__posts__like__comment">
          <div
            onClick={() => {
              setOpenComments(true);
            }}
          >
            <FaComments className="profile__posts__comments__icon" />
            <small>{comments?.length}</small>
          </div>
          <div>
            <AiFillHeart className="profile__posts__like__icon" />
            <small>{likesCount}</small>
          </div>
        </div>
      </div>

      <img
        loading="lazy"
        src={
          post?.imageURL
            ? post?.imageURL
            : post?.banner || post?.profile || post?.tag
        }
        alt={post?.displayName}
      />
      <div className="profile__post__date">
        <small>{time}</small>
      </div>
    </div>
  );
};
export default ProfilePost;
