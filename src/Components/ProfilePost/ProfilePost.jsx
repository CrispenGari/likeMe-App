import "./ProfilePost.css";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
const ProfilePost = ({ post }) => {
  return (
    <div className="profile__post">
      <div className="profile__post__image__cover">
        <div className="profile__posts__like">
          <AiFillHeart className="profile__posts__like__icon" />
          <small>4</small>
        </div>
      </div>

      <img loading="lazy" src={post?.imageURL} alt={post?.username} />
      <div className="profile__post__date">
        <small>3 Jan 2020</small>
      </div>
    </div>
  );
};
export default ProfilePost;
