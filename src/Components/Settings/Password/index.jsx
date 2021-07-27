import React, { useRef, useState } from "react";
import Input from "../../EditProfile/Input/Input";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { CgLock } from "react-icons/cg";
import { IconButton } from "@material-ui/core";
import firebase from "../../../backend";
import { ActivityIndicator } from "../../Common";

import "./Password.css";
import { useHistory } from "react-router-dom";
const ChangePassword = () => {
  const history = useHistory();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const changePasswordHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmNewPassword) {
      setPasswordError("the two passwords must match!");
      setLoading(false);
      return;
    }
    firebase.auth.currentUser
      .updatePassword(newPassword)
      .then(() => {
        setChangePassword(false);
        setPasswordError("");
        history.push("/");
        firebase.auth.signOut();
      })
      .catch((error) => setPasswordError(error?.message))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={changePasswordHandler} className="settings__edit__password">
      <div className="settings__edit__password__header">
        <h1> Change Password</h1>
        <IconButton onClick={() => setChangePassword((prev) => !prev)}>
          {changePassword ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>
      {changePassword ? (
        <div className="settings__edit__password__expandable">
          {loading ? (
            <div className="settings__edit__password__loading">
              <ActivityIndicator size={30} />
            </div>
          ) : null}

          <p>
            By changing password action we will sign you out so that you will
            login with new password to prove your identity!
          </p>
          <div className="settings__edit__twins">
            <Input
              placeholder="new password"
              label="new password"
              value={newPassword}
              setValue={setNewPassword}
              IconRight={showNewPassword ? IoMdEye : IoMdEyeOff}
              IconLeft={CgLock}
              customRef={passwordRef}
              setShowPasswordIcon={setShowNewPassword}
              type="password"
              inputError={passwordError}
            />
            <Input
              placeholder="confirm new password"
              label="confirm new password"
              value={confirmNewPassword}
              setValue={setConfirmNewPassword}
              IconRight={showConfPassword ? IoMdEye : IoMdEyeOff}
              IconLeft={CgLock}
              customRef={confirmPasswordRef}
              setShowPasswordIcon={setShowConfPassword}
              type="password"
              inputError={passwordError}
            />
          </div>
          <button type="submit">change</button>
        </div>
      ) : null}
    </form>
  );
};

export default ChangePassword;
