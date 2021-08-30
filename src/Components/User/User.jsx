import React, { useState, useEffect } from "react";
import "./User.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const User = ({ user, fleets }) => {
  const history = useHistory();
  const [chatMessages, setChatMessages] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.messages);
  const [fleetsCount, setFleetsCount] = useState(0);

  useEffect(() => {
    setFleetsCount(
      fleets?.filter((fleet) => fleet?.data?.userId === user?.data?.uid).length
    );
  }, [fleets, user]);

  const openChat = () => {
    history.replace(`/chat/${user?.data?.uid}`);
  };

  useEffect(() => {
    setChatMessages(
      messages?.filter((message) => {
        return (
          String(message?.data?.chatId).includes(currentUser?.uid) &&
          String(message?.data?.chatId).includes(user?.data?.uid)
        );
      })
    );
  }, [currentUser?.uid, messages, user?.data?.uid]);

  return (
    <div className="user" onClick={openChat}>
      <Avatar
        className={`user__avatar ${
          fleetsCount !== 0 && "user__avatar--has-fleet"
        }`}
        src={user?.data?.photoURL}
        alt={user?.data?.displayName}
      />
      <div className="user__info">
        <h1>
          {user?.data?.displayName}{" "}
          <HiBadgeCheck className="post__high__badge" />
        </h1>

        <small>No messages in this chat yet</small>
      </div>
      <div className="user__left">
        <small>all messages</small>
        {Boolean(chatMessages.length) && (
          <div className="user__message__badge">
            <small>{chatMessages?.length}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
