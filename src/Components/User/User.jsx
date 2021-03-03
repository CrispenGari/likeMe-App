import React from "react";
import "./User.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
const User = () => {
  return (
    <div className="user">
      <Avatar className="user__avatar" />
      <div className="user__info">
        <h1>
          Username <HiBadgeCheck className="post__high__badge" />
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
