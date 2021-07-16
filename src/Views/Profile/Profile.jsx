import React from "react";
import "./Profile.css";
import { Header } from "../../Components";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import ProfileBanner from "../../Components/ProfileBanner/ProfileBanner";
import ProfileStats from "../../Components/ProfileStats/ProfileStats";
import ProfileButtons from "../../Components/ProfileButtons/ProfileButtons";
import ProfileInfo from "../../Components/ProfileInfo/ProfileInfo";

const Profile = () => {
  React.useLayoutEffect(() => {
    document.title = `likeme • profile `;
  }, []);

  return (
    <div className="profile__view">
      <div className="profile__view__header">
        <Header />
      </div>
      <div className="profile__view__main">
        <ProfileBanner />
        <ProfileStats />
        <ProfileButtons />
        <ProfilePosts />
        <ProfileInfo />
      </div>
    </div>
  );
};

export default Profile;
