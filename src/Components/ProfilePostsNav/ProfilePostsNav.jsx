import "./ProfilePostsNav.css";
import React from "react";
import { IoMdPhotos } from "react-icons/io";
import { GiSelfLove, GiKnightBanner } from "react-icons/gi";
import { CgHashtag, CgProfile } from "react-icons/cg";
import ProfilePostsNavItem from "../ProfilePostsNavItem/ProfilePostsNavItem";
const ProfilePostNav = () => {
  return (
    <div className="profile__posts__nav">
      <ProfilePostsNavItem active title="photos" Icon={IoMdPhotos} />
      <ProfilePostsNavItem title="profiles" Icon={CgProfile} />
      <ProfilePostsNavItem title="covers" Icon={GiKnightBanner} />
      <ProfilePostsNavItem title="most liked" Icon={GiSelfLove} />
      <ProfilePostsNavItem title="tags" Icon={CgHashtag} />
    </div>
  );
};

export default ProfilePostNav;
