import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import firebase from "../../backend";
import "./HeaderRightItem.css";
import { VerifiedBadge } from "../Common";
import { v4 as uuid_v4 } from "uuid";
const HeaderRightItem = ({ content, withUser, title, Icon, subTitle, dot }) => {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) =>
    state?.users?.find((_user) => _user?.id === user?.uid)
  );
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
          <h1 className="username__holder">
            @{currentUser?.displayName}
            {currentUser?.userVerified ? <VerifiedBadge left={2} /> : null}
          </h1>
          <p>{subTitle}</p>
        </div>
      </div>
    );
  }
  const navigate = (title) => {
    if (title === "sign out") {
      firebase.auth.signOut().finally(() => history.replace("/"));
    } else if (title === "notifications") {
    } else if (title === "settings") {
      history.push(`/settings/${user?.uid}/${uuid_v4()}`);
    } else if (title === "notifications") {
    } else if (title === "friends") {
    } else if (title === "chats") {
    } else {
    }
  };
  return (
    <div
      className={`header__item ${!withUser && "header__item--without-user"}`}
      title={title}
      onClick={() => {
        navigate(title);
      }}
    >
      <div className="header__item__icon__button__badge">
        {dot ? (
          <span
            className={dot && "header__item__icon__button__badge__dot"}
          ></span>
        ) : (
          <span>{content}</span>
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
