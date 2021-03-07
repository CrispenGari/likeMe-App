import React from "react";
import "./User.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
import { useHistory } from "react-router-dom";
const User = ({ user }) => {
  const history = useHistory();
  const openChat = () => {
    history.replace(`/chat/${user?.data?.uid}`);
  };
  return (
    <div className="user" onClick={openChat}>
      <Avatar
        className="user__avatar"
        src={user?.data?.photoURL}
        alt={user?.data?.displayName}
      />
      <div className="user__info">
        <h1>
          {user?.data?.displayName}{" "}
          <HiBadgeCheck className="post__high__badge" />
        </h1>
        <small>Hello, how are you doing today?</small>
      </div>
      <div className="user__left">
        <small>3hrs</small>
        <div className="user__message__badge">
          <small>3</small>
        </div>
      </div>
    </div>
  );
};

export default User;
