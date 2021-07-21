import React from "react";
import { useState } from "react";
import "./EditProfile.css";
import Input from "./Input/Input";

const EditProfile = () => {
  const genders = ["male", "female", "gay", "lesbian"];

  const statuses = ["single", "dating", "complicated", "searching"];

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("invalid username!");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("email required!");

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
    </form>
  );
};

export default EditProfile;
