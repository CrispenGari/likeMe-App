import React from "react";
import { useState, useRef } from "react";
import "./EditProfile.css";
import Input from "./Input/Input";
import Avatar from "./Avatar/Avatar";
import { BsPersonCheck, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { CgLock } from "react-icons/cg";
import { IconButton } from "@material-ui/core";

const EditProfile = () => {
  const genders = ["male", "female", "gay", "lesbian"];

  const statuses = ["single", "dating", "complicated", "searching"];

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const [birthday, setBirthday] = useState("");
  const [bestFriend, setBestFriend] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setLoading(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImage(event.target.result);
      setLoading(false);
    };
  };

  return (
    <form className="edit__profile">
      <h1>Edit your profile</h1>
      <div className="edit__profile__twins">
        <Input
          focus={true}
          placeholder="first name"
          label="first name"
          value={firstName}
          setValue={setFirstName}
          IconLeft={BsPersonCheck}
        />
        <Input
          placeholder="last name"
          label="last name"
          value={lastName}
          setValue={setLastName}
          IconLeft={BsPersonCheck}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="username"
          label="username"
          value={username}
          setValue={setUsername}
          inputError={usernameError}
          IconLeft={BsPersonCheck}
        />
        <Input
          placeholder="email"
          label="email"
          value={email}
          setValue={setEmail}
          inputError={emailError}
          IconLeft={HiOutlineMail}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="status"
          label="status"
          value={status}
          setValue={setStatus}
          options={statuses}
        />
        <Input
          placeholder="gender"
          label="gender"
          value={gender}
          setValue={setGender}
          options={genders}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="phone number"
          label="phone number"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <Input
          placeholder="best friend"
          label="best friend"
          value={bestFriend}
          setValue={setBestFriend}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="birthday"
          label="birthday"
          value={birthday}
          setValue={setBirthday}
          isDate
        />
        <Input
          placeholder="bio"
          label="bio"
          value={bio}
          setValue={setBio}
          isBio
          help={`${bio?.length} character(s) of 100`}
        />
      </div>

      <Avatar
        loading={loading}
        handleChange={handleChange}
        image={image}
        inputRef={inputRef}
        loading={loading}
      />
      <div className="edit__password__section">
        Change Password
        <IconButton onClick={() => setChangePassword((prev) => !prev)}>
          {changePassword ? <BsChevronUp /> : <BsChevronDown />}
        </IconButton>
      </div>

      {changePassword ? (
        <div className="edit__profile__password__expandable">
          <div className="edit__profile__twins edit__profile__single__tinny">
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
          <div className="edit__profile__twins">
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
        </div>
      ) : null}
      <div className="edit__buttons">
        <button type="submit">save</button>
        <button>cancel</button>
      </div>
    </form>
  );
};

export default EditProfile;
