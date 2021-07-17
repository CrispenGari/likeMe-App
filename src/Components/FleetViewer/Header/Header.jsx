import React from "react";
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
const Header = () => {
  return (
    <div className="fleet__header">
      <div className="fleet__header__top">
        <div>
          <span></span>
        </div>
      </div>
      <div className="fleet__header__bottom">
        <div className="fleet__header__bottom__left">
          <Avatar className="fleet__header__avatar" />
          <div className="fleet__info">
            <p>@username</p>
            <time>time</time>
          </div>
        </div>
        <div className="fleet__header__bottom__controls">
          <IconButton title="more">
            <FiMoreVertical className="fleet__header__bottom__icon" />
          </IconButton>
          <IconButton title="close">
            <AiFillCloseCircle className="form__close__button__icon" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
