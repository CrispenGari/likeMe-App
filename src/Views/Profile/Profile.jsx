import React from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Header } from "../../Components";
import { useSelector } from "react-redux";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import ProfileBanner from "../../Components/ProfileBanner/ProfileBanner";
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
        <ProfilePosts />
      </div>
    </div>
  );
};

export default Profile;
