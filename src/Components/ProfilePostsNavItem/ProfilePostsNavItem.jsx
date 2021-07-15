import "./ProfilePostsNavItem.css";
import React from "react";
const ProfilePostsNavItem = ({ Icon, active, title }) => {
  return (
    <div
      title={title}
      className={`profile__post__nav__item ${
        active ? "profile__post__nav__item__active" : ""
      }`}
    >
      <h1>{title}</h1>
      <Icon className="profile__post__nav__item__icon" />
    </div>
  );
};

export default ProfilePostsNavItem;
