import React from "react";
import "./Profile.css";
import { Header } from "../../Components";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import ProfileBanner from "../../Components/ProfileBanner/ProfileBanner";
import ProfileStats from "../../Components/ProfileStats/ProfileStats";
import ProfileButtons from "../../Components/ProfileButtons/ProfileButtons";

const Profile = () => {
  React.useLayoutEffect(() => {
    document.title = `likeme • profile `;
  }, []);

  return (
    <div className="profile">
      <div className="profile__header">
        <Header />
      </div>
      <div className="profile__main">
        <ProfileBanner />
        <ProfileStats />
        <ProfileButtons />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default Profile;
