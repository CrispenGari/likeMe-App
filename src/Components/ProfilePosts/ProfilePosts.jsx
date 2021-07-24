import { useSelector } from "react-redux";
import "./ProfilePosts.css";

import React from "react";
import ProfilePostNav from "../ProfilePostsNav/ProfilePostsNav";
import ProfilePost from "../ProfilePost/ProfilePost";
import { profileTabs } from "../../utils/tabs";
import { useParams } from "react-router-dom";
const ProfilePosts = () => {
  const { uid } = useParams();
  const profileTab = useSelector((state) => state.profileTab);

  const posts = useSelector((state) => state.posts).filter(
    (post) => post?.userId === uid
  );
  const banners = useSelector((state) => state.banners).filter(
    (banner) => banner?.userId === uid
  );
  const tags = [];
  const profiles = [];

  const displayPost =
    profileTab === profileTabs.PHOTOS
      ? [...posts, ...banners, ...profiles, ...tags]
      : profileTab === profileTabs.COVERS
      ? banners
      : profileTab === profileTabs.PROFILES
      ? profiles
      : tags;
  return (
    <div className="profile__posts">
      <ProfilePostNav />
      <div className="profile__posts__container">
        {displayPost?.map((post) => (
          <ProfilePost key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
