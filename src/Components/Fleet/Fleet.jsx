import React from "react";
import "./Fleet.css";
import { Avatar } from "@material-ui/core";
const Fleet = ({ user }) => {
  return (
    <div className="fleet">
      <Avatar
        className="fleet__avatar"
        src={user?.data?.photoURL}
        alt={user?.data?.displayName}
      />
    </div>
  );
};

export default Fleet;
