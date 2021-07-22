import "./ProfilePostsNavItem.css";
import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../actions";
const ProfilePostsNavItem = ({ Icon, active, title }) => {
  const dispatch = useDispatch();
  const changeTab = () => {
    dispatch(
      actions.setProfileTab(String(title).replace(/\s/, "_").toUpperCase())
    );
  };
  return (
    <div
      onClick={changeTab}
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
