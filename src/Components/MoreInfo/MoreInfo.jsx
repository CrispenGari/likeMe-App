import React, { useState } from "react";
import Avatar from "./Avatar";
import "./MoreInfo.css";
import { BsPersonCheck } from "react-icons/bs";
import Input from "../EditProfile/Input/Input";
import { useHistory } from "react-router-dom";
import firebase from "../../backend";
import { v4 as uuid_v4 } from "uuid";
import { ActivityIndicator } from "../Common";
import {
  nameExpression,
  phoneNumberExpression,
} from "../../utils/regularExpressions";
const MoreInfo = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const statuses = ["single", "dating", "complicated", "searching"];
  const genders = ["male", "female", "gay", "lesbian"];
  const [birthday, setBirthday] = useState("");
  const currentUser = firebase.auth.currentUser;
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [updateLoading, setUpdateLoading] = useState(false);

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
    setUpdateLoading(true);
    if (image) {
      // Post the image to storage
      const childName = `${currentUser?.displayName
        ?.trim()
        .toLowerCase()}_${uuid_v4()}`;
      const uploadTask = firebase.storage
        .ref(`profiles/${childName}`)
        .putString(image, "data_url");
      uploadTask.on(
        "state_changed",
        (obs) => {
          setProgress((obs.bytesTransferred / obs.totalBytes) * 100);
        },
        (error) => {
          console.error(error);
        },
        () => {
          firebase.storage
            .ref("profiles")
            .child(childName)
            .getDownloadURL()
            .then((url) => {
              firebase.auth.currentUser
                .updateProfile({
                  photoURL: url,
                  phoneNumber: phoneNumber,
                })
                .then(() => {
                  firebase.db.collection("users").doc(currentUser?.uid).update({
                    status: status,
                    firstName: firstName?.trim()?.toLowerCase(),
                    lastName: lastName?.trim()?.toLowerCase(),
                    gender: gender,
                    birthday: birthday,
                    phoneNumber: phoneNumber?.trim()?.toLowerCase(),
                    photoURL: url,
                    isNewUser: false,
                  });
                })
                .then(() => {
                  firebase.db.collection("profiles").add({
                    profile: url,
                    timestamp: firebase.timestamp,
                    displayName: currentUser?.displayName,
                    email: currentUser?.email,
                    userId: currentUser?.uid,
                  });
                });
            })
            .finally(() => {
              setImage(null);
              setProgress(0);
              setLoading(false);
              setUpdateLoading(false);
              setLastNameError("");
              setStatus(statuses[0]);
              setGender(genders[0]);
              history.replace("/");
            });
        }
      );
      return;
    } else {
      firebase.auth.currentUser
        .updateProfile({
          photoURL: null,
          phoneNumber: phoneNumber,
        })
        .then(() => {
          firebase.db.collection("users").doc(currentUser?.uid).update({
            status: status,
            firstName: firstName?.trim()?.toLowerCase(),
            lastName: lastName?.trim()?.toLowerCase(),
            gender: gender,
            birthday: birthday,
            phoneNumber: phoneNumber?.trim()?.toLowerCase(),
            photoURL: null,
            isNewUser: false,
          });
        })
        .finally(() => {
          setImage(null);
          setProgress(0);
          setLoading(false);
          setUpdateLoading(false);
          setLastNameError("");
          setStatus(statuses[0]);
          setGender(genders[0]);
          history.replace("/");
        });
    }
  };
  const notNow = async () => {
    await firebase.db
      .collection("users")
      .doc(currentUser?.uid)
      .update({
        status: null,
        firstName: null,
        lastName: null,
        gender: null,
        birthday: null,
        phoneNumber: null,
        photoURL: null,
        isNewUser: false,
      })
      .then(() => {})
      .catch((err) => console.error(err))
      .finally(() => history.replace("/"));
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
          <button onClick={save}>
            SAVE
            {updateLoading ? <ActivityIndicator size={15} /> : null}
          </button>
          <button onClick={notNow}>NOT NOW</button>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
