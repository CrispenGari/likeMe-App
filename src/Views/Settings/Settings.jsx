import "./Settings.css";
import React from "react";
import { Header } from "../../Components";

import { Profile } from "../../Components/Settings";
const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__header">
        <Header />
      </div>
      <div className="settings__main">
        <Profile />
      </div>
    </div>
  );
};

export default Settings;
