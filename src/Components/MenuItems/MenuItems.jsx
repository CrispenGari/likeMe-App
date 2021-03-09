import React from "react";
import "./MenuItems.css";
import { Message } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import firebase from "../../backend";
const MenuItems = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  return (
    <div className="menuitems">
      <div
        className="menuitem"
        onClick={() => history.push(`/profile/${user?.uid}`)}
      >
        <Avatar src={user?.photoURL} alt={user?.displayName} />
        <h1>{user?.displayName}</h1>
      </div>
      <div className="menuitem">
        <div onClick={() => history.push("/messages")}>
          <div className="menuitems__icon__button__badge">5</div>
          <Message className="menuitems__icon__message" />
        </div>
        <h1>Messages</h1>
      </div>
      <div className="menuitem">
        <div>
          <div className="menuitems__icon__button__badge">5</div>
          <IoIosPeople className="menuitems__icon__message__friends" />
        </div>
        <h1>People</h1>
      </div>
      <h1 onClick={() => firebase.auth.signOut()}>Sign Out</h1>
    </div>
  );
};

export default MenuItems;
