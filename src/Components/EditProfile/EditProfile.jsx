import React from "react";
import { useState, useRef, useEffect } from "react";
import "./EditProfile.css";
import Input from "./Input/Input";
import Avatar from "./Avatar/Avatar";
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import {
  usernameExp,
  emailExp,
  surnameExpression,
  nameExpression,
  phoneNumberExpression,
} from "../../utils/regularExpressions";
import helperFunctions from "../../utils/helperfunctions";
import { useParams } from "react-router-dom";
const EditProfile = ({ setEditProfile, noHeader }) => {
  const genders = ["male", "female", "gay", "lesbian"];
  const { uid } = useParams();
  const currentUser = useSelector((state) => state.users).find(
    (_user) => _user?.id === uid
  );
  const statuses = ["single", "dating", "complicated", "searching"];

  const inputRef = useRef(null);
  const [username, setUsername] = useState(
    currentUser?.displayName ? currentUser?.displayName : ""
  );
  const [usernameError, setUsernameError] = useState("");

  const [birthday, setBirthday] = useState(
    currentUser?.birthday ? currentUser?.birthday : ""
  );
  const [bestFriend, setBestFriend] = useState(
    currentUser?.bestFriend ? currentUser?.bestFriend : ""
  );

  const [bestFriendError, setBestFriendError] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber ?? ""
  );
  const [bio, setBio] = useState(currentUser?.bio ? currentUser?.bio : "");

  const [firstName, setFirstName] = useState(
    currentUser?.firstName ? currentUser?.firstName : ""
  );
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(
    currentUser?.lastName ? currentUser?.lastName : ""
  );
  const [lastNameError, setLastNameError] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ""
  );
  const [emailError, setEmailError] = useState("");

  const [image, setImage] = useState(
    currentUser?.photoURL ? currentUser?.photoUR : null
  );
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
  const saveChanges = (e) => {
    e.preventDefault();
    if (
      phoneNumber !== "" &&
      phoneNumberExpression.test(phoneNumber) === false
    ) {
      setPhoneNumberError("invalid phone number!");
      return;
    } else {
      setPhoneNumberError("");
    }
    if (
      (firstName !== "" && nameExpression.test(firstName) === false) === true
    ) {
      setFirstNameError("invalid first name!");
      return;
    } else {
      setFirstNameError("");
    }
    if (lastName !== "" && surnameExpression.test(lastName) === false) {
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
    if (bestFriend !== "" && usernameExp.test(bestFriend) === false) {
      setBestFriendError("invalid best friend username!");
      return;
    } else {
      setBestFriendError("");
    }
    if (email?.trim()?.toLowerCase() !== currentUser?.email) {
      setLoading(true);
      firebase.db
        .collection("users")
        .where("email", "==", email?.trim()?.toLowerCase())
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
    if (username?.trim()?.toLowerCase() !== currentUser?.displayName) {
      setLoading(true);
      firebase.db
        .collection("users")
        .where("displayName", "==", username?.trim()?.toLowerCase())
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            setUsernameError("username is already taken!");
            return;
          } else {
            setUsernameError("");
          }
        })
        .finally(() => setLoading(false));
    }

    if (image === null) {
      // remove the profile
      setLoading(true);
      helperFunctions
        .updateProfile(
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
          null,
          currentUser
        )
        .finally(() => {
          setLoading(false);
          setEditProfile(false);
        });
    } else {
      // put the image to the storage
      // create a profiles collection
      // update the profile
      // do some clean up
      setLoading(true);
      helperFunctions
        .updateProfile(
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
          image,
          currentUser
        )
        .then((res) => {})
        .finally(() => {
          setLoading(false);
          setEditProfile(false);
        });
    }
  };
  useEffect(() => {
    setImage(currentUser?.photoURL ? currentUser?.photoURL : null);
  }, [currentUser]);
  return (
    <form
      className={`edit__profile ${noHeader ? "edit__profile--settings" : ""}`}
    >
      {noHeader === false ? <h1>Edit your profile</h1> : null}
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
          inputError={phoneNumberError}
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
        setImage={setImage}
      />
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
