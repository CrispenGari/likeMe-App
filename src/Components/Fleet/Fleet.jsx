import React from "react";
import "./Fleet.css";
import { Avatar, IconButton } from "@material-ui/core";
import { IoAdd } from "react-icons/io5";
const Fleet = ({ isUserMe, user }) => {
  if (isUserMe) {
    return (
      <div className="fleet">
        <img
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg"
          alt=""
        />
        <div className="fleet__avatar__container">
          <Avatar
            className="fleet__avatar"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <IconButton title="add">
            <IoAdd className="fleet__avatar__icon" />
          </IconButton>
        </div>
      </div>
    );
  }
  return (
    <div className="fleet">
      <Avatar className="fleet__avatar" />
    </div>
  );
};

export default Fleet;
