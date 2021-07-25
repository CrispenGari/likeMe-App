import React from "react";
import { useState } from "react";
import { IconButton } from "@material-ui/core";

import "./Info.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector } from "react-redux";

const Info = () => {
  const [expand, setExpand] = useState(false);
  const user = useSelector((state) => state.user);

  const currentUser = useSelector((state) =>
    state?.users?.find((_user) => _user?.id === user?.uid)
  );

  console.log(currentUser);
  return (
    <div className="profile__settings__info">
      <div className="profile__settings__info__header">
        <h1>Personal Information</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? (
        <div className="profile__info__expandable">
          <div className="profile__info__expandable__twins">
            <p>
              <strong>username:</strong>
              <span>@{currentUser?.displayName}</span>
            </p>
            <p>
              <strong>email:</strong> <span>{currentUser?.email} </span>
            </p>
          </div>
          <div className="profile__info__expandable__twins">
            <p>
              <strong>first name:</strong> <span>{currentUser?.firstName}</span>
            </p>
            <p>
              <strong>last name:</strong> <span>{currentUser?.lastName}</span>
            </p>
          </div>
          <div className="profile__info__expandable__twins">
            <p>
              <strong>birth day:</strong>
              <span>{new Date(currentUser?.birthday).toDateString()}</span>
            </p>
            <p>
              <strong>age:</strong>
              <span>
                {new Date().getFullYear() -
                  new Date(currentUser?.birthday).getFullYear()}
              </span>
            </p>
          </div>
          <div className="profile__info__expandable__twins">
            <p>
              <strong>gender:</strong> <span> {currentUser?.gender}</span>
            </p>
            <p>
              <strong>status:</strong> <span> {currentUser?.status}</span>
            </p>
          </div>
          <div className="profile__info__expandable__twins">
            <p>
              <strong>phone number:</strong>
              <span> {currentUser?.phoneNumber}</span>
            </p>
            <p>
              <strong>best friend:</strong>
              <span> {currentUser?.bestFriend}</span>
            </p>
          </div>
          <button>Edit</button>
        </div>
      ) : null}
    </div>
  );
};

export default Info;
