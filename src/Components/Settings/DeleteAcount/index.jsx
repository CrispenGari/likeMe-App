import "./DeleteAccount.css";

import React from "react";

import { IconButton } from "@material-ui/core";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const DeleteAccount = () => {
  const [expand, setExpand] = React.useState(false);

  return (
    <div className="settings__delete__account">
      <div className="settings__delete__account__header">
        <h1>Account Deletion</h1>
        <IconButton onClick={() => setExpand((prev) => !prev)}>
          {expand ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {expand ? (
        <div className="settings__delete__account__expandable">
          <p>
            Once you delete your account your information will be lost and won't
            be recovered.
          </p>
          <button>delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteAccount;
