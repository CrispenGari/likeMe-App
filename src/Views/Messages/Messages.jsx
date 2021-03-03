import React from "react";
import "./Messages.css";
import { Header, User } from "../../Components";
import { Search } from "@material-ui/icons";
const Messages = () => {
  return (
    <div className="messages">
      <Header />
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
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <User key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
