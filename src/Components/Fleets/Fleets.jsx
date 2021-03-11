import React from "react";

import "./Fleets.css";
import { Fleet } from "../../Components";
import { Avatar, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useSelector } from "react-redux";

const Fleets = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  return (
    <div className="fleets">
      <div className="fleets__left">
        <Avatar
          className="fleets__left__avatar"
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <IconButton className="fleets__left__add__button">
          <Add className="fleets__left__add__icon" />
        </IconButton>
      </div>
      <div className="fleets__right">
        {users
          ?.filter((u) => u?.data?.uid !== user?.uid)
          .map((user_, i) => {
            return <Fleet key={i} user={user_} />;
          })}
      </div>
    </div>
  );
};

export default Fleets;
