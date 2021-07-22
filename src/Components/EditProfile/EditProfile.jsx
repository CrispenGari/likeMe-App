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
import { useSelector } from "react-redux";
import firebase from "../../backend";
import {
  usernameExp,
  emailExp,
  surnameExpression,
  nameExpression,
} from "../../utils/regularExpressions";
const EditProfile = ({ setEditProfile }) => {
  const genders = ["male", "female", "gay", "lesbian"];

  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.users).find(
    (_user) => user?.id === _user?.uid
  );

  const statuses = ["single", "dating", "complicated", "searching"];

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const inputRef = useRef(null);
  const [username, setUsername] = useState(currentUser?.displayName ?? "");
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

  const [bestFriendError, setBestFriendError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber ?? ""
  );
  const [bio, setBio] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [emailError, setEmailError] = useState("");

  const [image, setImage] = useState(currentUser?.photoURL ?? null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  // ^(?=[a-zA-Z0-9._]{7,20}$)(?!.*[_.]{2})[^_.].*[^_.]$
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

  const saveChanges = (e) => {
    e.preventDefault();

    console.log(
      firstName,
      lastName,
      username,
      email,
      status,
      gender,
      phoneNumber,
      bestFriend,
      birthday,
      bio,
      image
    );

    console.log(firstName !== "" && nameExpression.test(firstName) === false);
    console.log();
    if (
      (firstName !== "" && nameExpression.test(firstName) === false) === true
    ) {
      setFirstNameError("invalid first name!");
      return;
    } else {
      setFirstNameError("");
    }
    if (lastName !== "" && !surnameExpression.test(lastName) === false) {
      setLastNameError("invalid last name!");
      return;
    } else {
      setLastNameError("");
    }
    if (usernameExp.test(username) === false) {
      setUsernameError("invalid username!");
      return;
    } else {
      setUsernameError("");
    }

    if (emailExp.test(email) === false) {
      setEmailError("invalid email address!");
      return;
    } else {
      setEmailError("");
    }
    if (bestFriend !== "" && usernameExp.test(setBestFriendError) === false) {
      setBestFriendError("invalid best friend username!");
      return;
    } else {
      setBestFriendError("");
    }
    if (username !== currentUser?.displayName || email !== currentUser?.email) {
      setLoading(true);
      firebase.db
        .collection("users")
        .where("displayName", "==", username)
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            setUsernameError("username is already taken!");
            return;
          } else {
            setUsernameError("");
          }
        });
      firebase.db
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            setEmailError("email is already taken!");
            return;
          } else {
            setEmailError("");
          }
        })
        .finally(() => setLoading(false));
    }
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
          inputError={firstNameError}
        />
        <Input
          placeholder="last name"
          label="last name"
          value={lastName}
          setValue={setLastName}
          IconLeft={BsPersonCheck}
          inputError={lastNameError}
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
          inputError={bestFriendError}
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
        <button type="submit" onClick={saveChanges}>
          save
        </button>
        <button onClick={() => setEditProfile(false)}>cancel</button>
      </div>
    </form>
  );
};

export default EditProfile;
