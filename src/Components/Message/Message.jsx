import React from "react";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Message.css";
import timeFunct from "../../utils/time";
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
        {message?.data?.imageMessage && (
          <img src={message?.data?.imageMessage} alt="message-post" />
        )}
        <p>{message?.data?.message}</p>
        <p>
          <small>seen</small>
          <small>{timeFunct(message?.data?.timestamp)}</small>
        </p>
      </div>
    </div>
  );
};

export default Message;
