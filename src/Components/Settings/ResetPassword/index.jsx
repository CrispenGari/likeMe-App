import "./ResetPassword.css";

import React from "react";

import { IconButton } from "@material-ui/core";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Reset from "./Reset/Reset";

const ResetPassword = () => {
  const [expand, setExpand] = React.useState(false);
  return (
    <div className="settings__reset__password">
      <div className="settings__reset__password__header">
        <h1>Reset Password</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? (
        <div className="settings__reset__password__expandable">
          <Reset />
        </div>
      ) : null}
    </div>
  );
};

export default ResetPassword;
