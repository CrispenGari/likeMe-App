import "./ProfilePostsNav.css";
import React from "react";
import { IoMdPhotos } from "react-icons/io";
import { GiSelfLove } from "react-icons/gi";
import { CgHashtag } from "react-icons/cg";
import ProfilePostsNavItem from "../ProfilePostsNavItem/ProfilePostsNavItem";
const ProfilePostNav = () => {
  return (
    <div className="profile__posts__nav">
      <ProfilePostsNavItem title="photos" Icon={IoMdPhotos} />
      <ProfilePostsNavItem active title="most liked" Icon={GiSelfLove} />
      <ProfilePostsNavItem title="tags" Icon={CgHashtag} />
    </div>
  );
};

export default ProfilePostNav;
