import { useSelector } from "react-redux";
import "./ProfilePosts.css";

import React from "react";
import ProfilePostNav from "../ProfilePostsNav/ProfilePostsNav";
import ProfilePost from "../ProfilePost/ProfilePost";

const ProfilePosts = () => {
  const posts = useSelector((state) => state.posts);
  return (
    <div className="profile__posts">
      <ProfilePostNav />
      <div className="profile__posts__container">
        {posts
          .map((post) => ({
            id: post.id,
            ...post.data,
          }))
          ?.map((post) => (
            <ProfilePost key={post?.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
