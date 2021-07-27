import "./Settings.css";
import React from "react";
import { Header } from "../../Components";

import {
  Profile,
  Info,
  DeleteAccount,
  Theme,
  DisableAccount,
  Password,
  EditProfile,
  ResetPassword,
} from "../../Components/Settings";
const Settings = () => {
  const [expandProfile, setExpandProfile] = React.useState(false);

  return (
    <div className="settings">
      <div className="settings__header">
        <Header />
      </div>
      <div className="settings__main">
        <Profile />
        <Info setExpandProfile={setExpandProfile} />
        <EditProfile expand={expandProfile} setExpand={setExpandProfile} />
        <DeleteAccount />
        <Theme />
        <DisableAccount />
        <Password />
        <ResetPassword />
      </div>
    </div>
  );
};

export default Settings;
