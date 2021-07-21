import React from "react";
import { useState, useRef } from "react";
import "./EditProfile.css";
import Input from "./Input/Input";
import Avatar from "./Avatar/Avatar";

const EditProfile = () => {
  const genders = ["male", "female", "gay", "lesbian"];

  const statuses = ["single", "dating", "complicated", "searching"];

  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [changePassword, setChangePassword] = useState(true);

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
          setValue={firstName}
        />
        <Input
          placeholder="last name"
          label="last name"
          value={lastName}
          setValue={setLastName}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="username"
          label="username"
          value={username}
          setValue={setUsername}
          inputError={usernameError}
        />
        <Input
          placeholder="email"
          label="email"
          value={email}
          setValue={setEmail}
          inputError={emailError}
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
          help={"36 characters of 100"}
        />
      </div>

      <Avatar
        loading={loading}
        handleChange={handleChange}
        image={image}
        inputRef={inputRef}
        loading={loading}
      />
      <h2>Change Password</h2>

      <div className="edit__profile__twins edit__profile__single__tinny">
        <Input
          placeholder="current password"
          label="current password"
          value={currentPassword}
          setValue={setCurrentPassword}
        />
      </div>
      <div className="edit__profile__twins">
        <Input
          placeholder="new password"
          label="new password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <Input
          placeholder="confirm new password"
          label="confirm new password"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
        />
      </div>
      <div className="edit__buttons">
        <button>save</button>
        <button>cancel</button>
      </div>
    </form>
  );
};

export default EditProfile;
