import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import firebase from "../../backend";
import "./HeaderRightItem.css";
import { v4 as uuid_v4 } from "uuid";
const HeaderRightItem = ({ withUser, title, Icon, subTitle, dot }) => {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  if (withUser) {
    return (
      <div
        className="header__item"
        title={user?.displayName}
        onClick={() => {
          history.push(`/profile/${user?.uid}/${uuid_v4()}`);
        }}
      >
        <Avatar
          className="header__item__avatar"
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <div>
          <h1>{user?.displayName}</h1>
          <p>{subTitle}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`header__item ${!withUser && "header__item--without-user"}`}
      title={title}
      onClick={() => {
        if (title === "sign out") {
          firebase.auth.signOut();
        }
      }}
    >
      <div className="header__item__icon__button__badge">
        {dot ? (
          <span
            className={dot && "header__item__icon__button__badge__dot"}
          ></span>
        ) : (
          <span>10</span>
        )}
        <Icon className="header__item__icon" />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

export default HeaderRightItem;
