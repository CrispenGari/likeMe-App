import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import "./MoreInfo.css";
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";
import Input from "../EditProfile/Input/Input";
import { useParams } from "react-router-dom";

import {
  usernameExp,
  emailExp,
  surnameExpression,
  nameExpression,
  phoneNumberExpression,
} from "../../utils/regularExpressions";
import helperFunctions from "../../utils/helperfunctions";
const MoreInfo = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const statuses = ["single", "dating", "complicated", "searching"];
  const genders = ["male", "female", "gay", "lesbian"];
  const [birthday, setBirthday] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);

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

  const save = () => {
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
    if ((lastName !== "" && nameExpression.test(lastName) === false) === true) {
      setLastNameError("invalid last name!");
      return;
    } else {
      setLastNameError("");
    }

    // If we don't have these errors then magic should fire
    //     if (image) {
    //         const uploadTask = firebase.storage
    //           .ref(`profiles/${username}`)
    //           .putString(image, "data_url");
    //         uploadTask.on(
    //           "state_changed",
    //           (obs) => {
    //             setProgress((obs.bytesTransferred / obs.totalBytes) * 100);
    //           },
    //           (error) => {
    //             console.error(error);
    //           },
    //           () => {
    //             firebase.storage
    //               .ref("profiles")
    //               .child(username)
    //               .getDownloadURL()
    //               .then((url) => {
    //                 firebase.auth
    //                   .createUserWithEmailAndPassword(
    //                     userCredentials.email,
    //                     userCredentials.password
    //                   )
    //                   .then((authUser) => {
    //                     authUser.user
    //                       .updateProfile({
    //                         displayName: username.trim().toLowerCase(),
    //                         photoURL: url,
    //                       })
    //                       .then(() => {
    //                         setCredentials({});
    //                         setImage(null);
    //                         setProgress(0);
    //                         setUsernameError("");
    //                         setUsername("");
    //                         const { displayName, email, photoURL, uid } =
    //                           authUser.user;
    //                         firebase.db.collection("users").doc(uid).set({
    //                           displayName: displayName,
    //                           email: email,
    //                           photoURL: photoURL,
    //                           phoneNumber: null,
    //                         });
    //                         setCardToMount("login");
    //                       });
    //                   })
    //                   .catch((error) => setUsernameError(error.message))
    //                   .finally(() => {
    //                     setLoadingCreate(false);
    //                   });
    //               });
    //           }
    //         );
    //       } else {
    //         firebase.auth
    //           .createUserWithEmailAndPassword(
    //             userCredentials.email,
    //             userCredentials.password
    //           )
    //           .then((authUser) => {
    //             authUser.user
    //               .updateProfile({
    //                 displayName: username.trim().toLowerCase(),
    //                 photoURL: null,
    //               })
    //               .then(() => {
    //                 setCredentials({});
    //                 setImage(null);
    //                 setProgress(0);
    //                 setUsernameError("");
    //                 setUsername("");
    //                 const { displayName, email, photoURL, uid } = authUser.user;
    //                 firebase.db.collection("users").doc(uid).set({
    //                   displayName: displayName,
    //                   email: email,
    //                   photoURL: photoURL,
    //                   phoneNumber: null,
    //                 });
    //                 setCardToMount("login");
    //               });
    //           })
    //           .catch((error) => setUsernameError(error.message))
    //           .finally(() => {
    //             setLoadingCreate(false);
    //           });
    //       }
    //     }
    //   });
  };
  return (
    <div className="more__info">
      <div className="more__info__main">
        <h1>Let's us know you better!</h1>
        <Avatar
          handleChange={handleChange}
          image={image}
          progress={progress}
          setLoading={setLoading}
          setImage={setImage}
          loading={loading}
        />

        <div className="edit__profile__twins">
          <Input
            placeholder="phone number"
            label="phone number"
            value={phoneNumber}
            setValue={setPhoneNumber}
            inputError={phoneNumberError}
          />
          <Input
            placeholder="birthday"
            label="birthday"
            value={birthday}
            setValue={setBirthday}
            isDate
          />
        </div>
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

        <div className="more__info__buttons">
          <button onClick={save}>SAVE</button>
          <button>NOT NOW</button>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
