import "./Settings.css";
import React from "react";
import { Header } from "../../Components";

import { Profile, Info, DeleteAccount } from "../../Components/Settings";
const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__header">
        <Header />
      </div>
      <div className="settings__main">
        <Profile />
        <Info />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
