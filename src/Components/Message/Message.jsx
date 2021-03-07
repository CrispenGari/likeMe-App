import React from "react";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Message.css";
const Message = ({ message, newFriend }) => {
  const user = useSelector((state) => state.user);
  return (
    <div
      className={`message ${
        user?.uid === message?.data?.sender && "message__sent"
      }`}
    >
      <Avatar
        className="message__avatar"
        src={
          user?.uid === message?.data?.sender
            ? user?.photoURL
            : newFriend?.data?.photoURL
        }
      />
      <div className="message__body">
        <p>{message?.data?.message}</p>
        <p>
          <small>seen</small>
          <small>12.30</small>
        </p>
      </div>
    </div>
  );
};

export default Message;
