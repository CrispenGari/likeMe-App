import React, { useState, useEffect } from "react";
import "./Messages.css";
import { Header, User } from "../../Components";
import { Search } from "@material-ui/icons";
import { useSelector } from "react-redux";
const Messages = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  return (
    <div className="messages">
      <div className="messages__header">
        <Header />
      </div>
      <div className="messages__main">
        <div className="messages__container">
          <div
            className="
        "
          >
            <h1>Messages</h1>
            <div className="messages__search">
              <input type="text" placeholder="Search chat..." />
              <Search />
            </div>
          </div>
          <div className="messages__chats">
            {users?.map(
              (user_) =>
                user_?.data.uid !== user?.uid && (
                  <User key={user?.id} user={user_} />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
