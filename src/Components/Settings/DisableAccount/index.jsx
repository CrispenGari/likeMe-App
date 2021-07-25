import "./DisableAccount.css";

import React from "react";

import { IconButton, Switch } from "@material-ui/core";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BsPersonCheckFill, BsPersonDashFill } from "react-icons/bs";
const DisableAccount = () => {
  const [expand, setExpand] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return (
    <div className="settings__disable__account">
      <div className="settings__disable__account__header">
        <h1>Temporarily Disable Account</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? (
        <div className="settings__disable__account__expandable">
          <p className="error">
            Disabling your account will turn off notifications for one day.
          </p>
          <h1>Current Status: {active ? "active" : "disabled"}</h1>

          <div>
            <BsPersonDashFill
              className={`settings__disable__account__icons ${
                active ? "" : "settings__disable__account__icons--active"
              }`}
            />
            <Switch
              className="settings__disable__account__switch"
              value={active}
              onChange={() => setActive((prev) => !prev)}
              color="default"
            />

            <BsPersonCheckFill
              className={`settings__disable__account__icons ${
                !active ? "" : "settings__disable__account__icons--active"
              }`}
            />
          </div>
          <button>save</button>
        </div>
      ) : null}
    </div>
  );
};

export default DisableAccount;
