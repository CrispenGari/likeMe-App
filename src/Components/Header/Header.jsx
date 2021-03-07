import React, { useState } from "react";
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Search, Message, Menu } from "@material-ui/icons";
import countries from "../../utils/countries";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { useHistory } from "react-router-dom";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const select = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestionsResults([]);
  };
  const suggest = () => {
    if (searchTerm.length === 0) {
      setSuggestionsResults([]);
    }
    search(searchTerm);
  };
  const search = (query) => {
    if (query.length > 0) {
      const res = countries
        .filter((country) => {
          const exp = new RegExp(`^${query}`, "gi");
          return country.match(exp);
        })
        .splice(0, 5);
      setSuggestionsResults(res);
      if (res.length === 0) {
        setSuggestionsResults(
          countries.filter((country) => country.indexOf(query) !== -1)
        );
      }
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <h1 onClick={() => history.push("/")}>
          <AiFillLike className="header__like__icon" />
          <span>M</span>
          <span>e</span>
        </h1>
      </div>
      <div className="header__center">
        <div className="header__search">
          <input
            type="text"
            placeholder="Search your partner"
            onKeyUp={suggest}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="header__search__icon" />
        </div>
        <div className="header__search__results__container">
          {suggestionsResults.map((suggestion, index) => (
            <div key={index} onClick={() => select(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div className="header__right">
        <div className="header__right__control__container">
          <IconButton
            onClick={() => history.push("/messages")}
            className="header__right__icon__button"
            title="messages"
          >
            <div className="header__icon__button__badge">5</div>
            <Message className="header__icon__message" />
          </IconButton>
          <IconButton className="header__right__icon__button" title="people">
            <div className="header__icon__button__badge">5</div>
            <IoIosPeople className="header__icon__message__friends" />
          </IconButton>
          <Avatar
            className="header__right__avatar"
            alt={user?.displayName}
            src={user.photoURL}
            onClick={() => history.push(`/profile/${user?.uid}`)}
            title="profile"
          />
        </div>

        <IconButton
          className="header__right__icon__button header__icon__button__menu"
          title="Menu"
        >
          <Menu className="header__icon__message__menu" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
