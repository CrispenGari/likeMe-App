import React from "react";
import "./Person.css";
import { Avatar } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
const Person = ({ user }) => {
  return (
    <div className="person">
      <div className="person__top">
        <Avatar
          className="person__avatar"
          alt={user?.data.displayName}
          src={user?.data.photoURL}
        />
        <div className="person__top__info">
          <h1>
            {user?.data?.displayName}{" "}
            <HiBadgeCheck className="post__high__badge" />
          </h1>
          <small>Bio</small>
          <div className="person__top__info__followings">
            <small>2 • Followings</small>
            <small>3 • Followers</small>
          </div>
          <div className="person__top__info__more">
            <small>Gender</small>
            <small>Status</small>
          </div>
        </div>
      </div>
      <div className="person__bottom">
        <button>Message</button>
        <button>Profile</button>
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Person;
