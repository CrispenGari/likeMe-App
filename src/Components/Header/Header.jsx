import React, { useState, useEffect } from "react";
import "./Header.css";
import { Avatar, IconButton, Popover } from "@material-ui/core";
import { Search, Message, Menu } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { MenuItems } from "../../Components";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  // All people except me are friends in this case
  const [friends, setFriends] = useState([]);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // This method will open the profile of the selected friend
  const openFriendProfile = (friend) => {
    history.push(`/profile/${friend?.data?.uid}`);
  };

  const select = (suggestion) => {
    setSearchTerm(suggestion?.data?.displayName);
    openFriendProfile(suggestion);
    setSuggestionsResults([]);
  };
  const suggest = () => {
    if (searchTerm.length === 0) {
      setSuggestionsResults([]);
    }
    search(searchTerm);
  };

  useEffect(() => {
    const _friends = users?.filter((user_) => user_?.data?.uid !== user?.uid);
    setFriends(_friends);
  }, [users, user?.uid]);

  const search = (query) => {
    if (query.length > 0) {
      const res = friends
        .filter((friend) => {
          const exp = new RegExp(`^${query}`, "gi");
          // search for either name, surname, email, phone, bio, username
          return friend?.data?.displayName?.match(exp);
        })
        .splice(0, 5);
      setSuggestionsResults(res);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <h1 onClick={() => history.push("/")}>LIKE ME</h1>
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
              {suggestion?.data?.displayName}
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
            {users?.length - 1 > 0 && (
              <div className="header__icon__button__badge">
                {
                  // all chats
                  users?.length - 1
                }
              </div>
            )}
            <Message className="header__icon__message" />
          </IconButton>
          <IconButton
            className="header__right__icon__button"
            title="people"
            onClick={() => history.push("/people")}
          >
            {users?.length - 1 > 0 && (
              <div className="header__icon__button__badge">
                {
                  // all users excluding me
                  users?.length - 1
                }
              </div>
            )}
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

        <div className="header__right__menu__container">
          <IconButton
            className="header__right__icon__button header__icon__button__menu"
            title="Menu"
            onClick={openPop}
          >
            <Menu className="header__icon__message__menu" />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItems />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
