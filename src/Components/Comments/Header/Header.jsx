import "./Header.css";
import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import helperFunctions from "../../../utils/helperfunctions";
import { useSelector } from "react-redux";
const Header = () => {
  return (
    <div className="header__input">
      <div className="header__input__left">
        <Avatar className="header__input__avatar" />
        <div className="comment__info">
          <p>@username's post</p>
          <span>time</span>
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
        <IconButton title="close">
          <AiFillCloseCircle className="form__close__button__icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
