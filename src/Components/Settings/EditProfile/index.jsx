import "./EditProfile.css";

import React from "react";

import EditProfile from "../../EditProfile/EditProfile";
import { IconButton } from "@material-ui/core";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
const SettingsEditProfile = () => {
  const [expand, setExpand] = React.useState(false);
  return (
    <div className="settings__edit__profile">
      <div className="settings__edit__profile__header">
        <h1>Edit Profile</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? <EditProfile noHeader={true} /> : null}
    </div>
  );
};

export default SettingsEditProfile;
