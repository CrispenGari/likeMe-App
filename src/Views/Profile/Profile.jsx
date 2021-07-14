import React from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Header } from "../../Components";
import { useSelector } from "react-redux";
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
      <ProfileBanner />
    </div>
  );
};

export default Profile;
