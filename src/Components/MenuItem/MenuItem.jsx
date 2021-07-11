import "./MenuItem.css";
import React from "react";
import { Message } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import firebase from "../../backend";
const MenuItem = ({ withUser, title, Icon, subTitle, dot }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const friends = users?.filter((user_) => user_?.data?.uid !== user?.uid);

  if (withUser) {
    return (
      <div className="menuitem" title={user?.displayName}>
        <Avatar
          className="menuitem__avatar"
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
      className={`menuitem ${!withUser && "menuitem--without-user"}`}
      title={title}
    >
      <div className="menuitem__icon__button__badge">
        {dot ? (
          <span className={dot && "menuitem__icon__button__badge__dot"}></span>
        ) : (
          <span>10</span>
        )}
        <Icon className="menuitem__icon" />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

export default MenuItem;
