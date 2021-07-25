import React, { useRef, useState } from "react";
import Input from "../../EditProfile/Input/Input";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { CgLock } from "react-icons/cg";
import { IconButton } from "@material-ui/core";

import "./Password.css";
const ChangePassword = () => {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className="settings__edit__password">
      <div className="settings__edit__password__header">
        <h1> Change Password</h1>
        <IconButton onClick={() => setChangePassword((prev) => !prev)}>
          {changePassword ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>

      {changePassword ? (
        <div className="settings__edit__password__expandable">
          <div className="settings__edit__twins settings__edit__single__tinny">
            <Input
              placeholder="current password"
              label="current password"
              value={currentPassword}
              setValue={setCurrentPassword}
              IconRight={showCurrentPassword ? IoMdEye : IoMdEyeOff}
              IconLeft={CgLock}
              customRef={currentPasswordRef}
              setShowPasswordIcon={setShowCurrentPassword}
              type="password"
            />
          </div>
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
            />
          </div>
          <button>change</button>
        </div>
      ) : null}
    </div>
  );
};

export default ChangePassword;
