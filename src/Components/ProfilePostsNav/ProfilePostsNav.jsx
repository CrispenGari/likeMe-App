import "./ProfilePostsNav.css";
import React from "react";
import { useSelector } from "react-redux";
import { IoMdPhotos } from "react-icons/io";
import { GiSelfLove, GiKnightBanner } from "react-icons/gi";
import { CgHashtag, CgProfile } from "react-icons/cg";
import ProfilePostsNavItem from "../ProfilePostsNavItem/ProfilePostsNavItem";
import { profileTabs } from "../../utils/tabs";
const ProfilePostNav = () => {
  const profileTab = useSelector((state) => state.profileTab);

  return (
    <div className="profile__posts__nav">
      <ProfilePostsNavItem
        active={profileTab === profileTabs.PHOTOS}
        title="photos"
        Icon={IoMdPhotos}
      />
      <ProfilePostsNavItem
        title="profiles"
        active={profileTab === profileTabs.PROFILES}
        Icon={CgProfile}
      />
      <ProfilePostsNavItem
        active={profileTab === profileTabs.COVERS}
        title="covers"
        Icon={GiKnightBanner}
      />
      <ProfilePostsNavItem
        active={profileTab === profileTabs.MOST_LIKED}
        title="most liked"
        Icon={GiSelfLove}
      />
      <ProfilePostsNavItem
        title="tags"
        active={profileTab === profileTabs.TAGS}
        Icon={CgHashtag}
      />
    </div>
  );
};

export default ProfilePostNav;
