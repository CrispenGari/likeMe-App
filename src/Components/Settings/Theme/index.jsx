import "./Theme.css";

import React from "react";

import { IconButton, Switch } from "@material-ui/core";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { WiDayWindy } from "react-icons/wi";
import { TiWeatherNight } from "react-icons/ti";
const Theme = () => {
  const [expand, setExpand] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  return (
    <div className="settings__theme">
      <div className="settings__theme__header">
        <h1>Customize Theme</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? (
        <div className="settings__theme__expandable">
          <h1>Current Theme: {dark ? "dark" : "light"}</h1>

          <div>
            <WiDayWindy
              className={`settings__theme__icons ${
                dark ? "" : "settings__theme__icons--active"
              }`}
            />
            <Switch
              className="settings__theme__switch"
              value={dark}
              onChange={() => setDark((prev) => !prev)}
              color="default"
            />

            <TiWeatherNight
              className={`settings__theme__icons ${
                !dark ? "" : "settings__theme__icons--active"
              }`}
            />
          </div>
          <button>save</button>
        </div>
      ) : null}
    </div>
  );
};

export default Theme;
