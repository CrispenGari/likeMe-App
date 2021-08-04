import "./Header.css";
import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai";
import helperFunctions from "../../../utils/helperfunctions";
import { useSelector } from "react-redux";
import { VerifiedBadge } from "../../Common";

const Header = ({ setOpenComments, post }) => {
  const user = useSelector((state) => state.user);
  const time = helperFunctions.timeString(
    helperFunctions.timestampToTime(post.timestamp)
  );

  return (
    <div className="header__input">
      <div className="header__input__left">
        <Avatar
          src={post?.photoURL}
          alt={post?.displayName}
          className="header__input__avatar"
        />
        <div className="comment__info">
          <p>
            {post?.displayName === user?.displayName
              ? "@you"
              : "@" + post?.displayName + "'s post"}
            {post?.userVerified ? <VerifiedBadge /> : null}
          </p>
          <span>{time}</span>
        </div>
      </div>
      <div className="header__input__center">
        <p>people in the comment list</p>
        <div className="header__input__center__avatars">
          <Avatar className="header__input__avatar" />
          <Avatar className="header__input__avatar" />
          <Avatar className="header__input__avatar" />
          <Avatar className="header__input__avatar" />
          <Avatar className="header__input__avatar" />
          <Avatar className="header__input__avatar" />
        </div>
      </div>
      <div className="header__input__right">
        <IconButton title="close" onClick={() => setOpenComments(false)}>
          <AiFillCloseCircle className="form__close__button__icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
