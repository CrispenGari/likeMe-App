import { useSelector } from "react-redux";
import "./ProfilePosts.css";

import React from "react";
import ProfilePostNav from "../ProfilePostsNav/ProfilePostsNav";

const ProfilePosts = () => {
  return (
    <div className="profile__posts">
      <ProfilePostNav />
      <div className="profile__posts__container"></div>
    </div>
  );
};

export default ProfilePosts;
