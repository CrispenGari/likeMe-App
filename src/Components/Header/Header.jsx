import React, { useState, useEffect } from "react";
import "./Header.css";
import { IconButton } from "@material-ui/core";
import { Search, Menu } from "@material-ui/icons";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { Menu as MenuContainer } from "../../Components";
import HeaderRight from "../HeaderRight/HeaderRight";
import { logos } from "../../utils/logos";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="header">
      <div className="header__left">
        <img onClick={() => history.push("/")} src={logos.header_logo} alt="" />
      </div>
      <div className="header__right">
        <div className="header__right__control__container">
          <HeaderRight />
        </div>
        <div className="header__right__menu__container">
          <IconButton
            className="header__right__icon__button header__icon__button__menu"
            title="Menu"
            onClick={openMenu}
          >
            <Menu className="header__icon__message__menu" />
          </IconButton>
          {open ? <MenuContainer setOpen={setOpen} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
