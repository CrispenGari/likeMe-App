import "./ProfileStats.css";
import React from "react";

const ProfileStats = () => {
  return (
    <div className="profile__stats">
      <div className="profile__stats__item">
        <h1>512</h1>
        <p>Likes</p>
      </div>
      <div className="profile__stats__item">
        <h1>512</h1>
        <p>Followers</p>
      </div>
      <div className="profile__stats__item">
        <h1>5.3M</h1>
        <p>Followings</p>
      </div>
    </div>
  );
};

export default ProfileStats;
