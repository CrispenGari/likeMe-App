import React from "react";
import "./Like.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
const Like = ({ like }) => {
  return (
    <div className="like">
      <Avatar
        className="like__avatar"
        src={like?.data?.userAvatar}
        alt={like?.data?.username}
      />

      <h1>
        {String(like?.data?.username).split(/\s/)[0]}{" "}
        <HiBadgeCheck className="like__high__badge" />
      </h1>
    </div>
  );
};

export default Like;
