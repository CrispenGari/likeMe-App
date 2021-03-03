import React, { useState } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import countries from "../../utils/countries";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const user = useSelector((state) => state.user);

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
        <h1>
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
        <Avatar
          className="header__right__avatar"
          alt={user?.displayName}
          src={user.photoURL}
        />
      </div>
    </div>
  );
};

export default Header;
