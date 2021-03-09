import React, { useState, useEffect } from "react";
import "./User.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const User = ({ user }) => {
  const history = useHistory();
  const [chatMessages, setChatMessages] = useState([]);
  const messages = useSelector((state) => state.messages);

  const openChat = () => {
    history.replace(`/chat/${user?.data?.uid}`);
  };
  useEffect(() => {
    const _chatMessages = messages?.filter((message) => {
      return message?.data?.receiver === user?.data?.uid;
    });
    setChatMessages(_chatMessages);
  }, [messages, user?.data?.uid]);

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
        {/* Show the last message */}
        {chatMessages?.length ? (
          <small>
            {chatMessages[chatMessages?.length - 1]?.data?.message} •{" "}
            {chatMessages[chatMessages?.length - 1]?.data?.receiver !==
            user?.data?.uid
              ? "not you"
              : "you"}
          </small>
        ) : (
          <small>No messages in this chat yet</small>
        )}
      </div>
      <div className="user__left">
        <small>all messages</small>
        <div className="user__message__badge">
          <small>{chatMessages?.length}</small>
        </div>
      </div>
    </div>
  );
};

export default User;
