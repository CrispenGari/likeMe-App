import "./Profile.css";
import { AiFillCamera } from "react-icons/ai";
import { Avatar, IconButton } from "@material-ui/core";
import { useRef, useState } from "react";
import firebase from "../../backend";
import { ActivityIndicator } from "../../Components/Common";
import { BsPersonCheck } from "react-icons/bs";
import { usernameExp } from "../../utils/regularExpressions";
import { logos } from "../../utils/logos";
const Profile = ({ setCardToMount, credentials, setCredentials }) => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const createAccount = (e) => {
    e.preventDefault();
    if (usernameExp.test(username) === false) {
      return setUsernameError("invalid username!");
    } else {
      setUsernameError("");
    }
    setLoadingCreate(true);

    firebase.db
      .collection("users")
      .where("displayName", "==", username)
      .get()
      .then((doc) => {
        if (doc.docs.length > 0) {
          setLoadingCreate(false);
          setUsernameError("the username is already taken by someone!");
        } else {
          setUsernameError("");
          const userCredentials = {
            ...credentials,
            username: username,
          };
          if (!userCredentials.email && !userCredentials.password) {
            setLoadingCreate(false);
            return;
          }
          if (image) {
            const uploadTask = firebase.storage
              .ref(`profiles/${username}`)
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
                  .child(username)
                  .getDownloadURL()
                  .then((url) => {
                    firebase.auth
                      .createUserWithEmailAndPassword(
                        userCredentials.email,
                        userCredentials.password
                      )
                      .then((authUser) => {
                        authUser.user
                          .updateProfile({
                            displayName: username.trim().toLowerCase(),
                            photoURL: url,
                          })
                          .then(() => {
                            setCredentials({});
                            setImage(null);
                            setProgress(0);
                            setUsernameError("");
                            setUsername("");
                            const { displayName, email, photoURL, uid } =
                              authUser.user;
                            firebase.db.collection("users").doc(uid).set({
                              displayName: displayName,
                              email: email,
                              photoURL: photoURL,
                              phoneNumber: null,
                            });
                            setCardToMount("login");
                          });
                      })
                      .catch((error) => setUsernameError(error.message))
                      .finally(() => {
                        setLoadingCreate(false);
                      });
                  });
              }
            );
          } else {
            firebase.auth
              .createUserWithEmailAndPassword(
                userCredentials.email,
                userCredentials.password
              )
              .then((authUser) => {
                authUser.user
                  .updateProfile({
                    displayName: username.trim().toLowerCase(),
                    photoURL: null,
                  })
                  .then(() => {
                    setCredentials({});
                    setImage(null);
                    setProgress(0);
                    setUsernameError("");
                    setUsername("");
                    const { displayName, email, photoURL, uid } = authUser.user;
                    firebase.db.collection("users").doc(uid).set({
                      displayName: displayName,
                      email: email,
                      photoURL: photoURL,
                      phoneNumber: null,
                    });
                    setCardToMount("login");
                  });
              })
              .catch((error) => setUsernameError(error.message))
              .finally(() => {
                setLoadingCreate(false);
              });
          }
        }
      });
  };

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
    <form className="profile">
      <h1>Create a public profile</h1>
      <div className="profile__avatar__container">
        <p className="profile__input__message">
          This profile picture will be visible to everyone. Setting it is
          optional.
        </p>
        <div className="profile__avatar__container__cover">
          <Avatar
            className="profile__avatar"
            src={image ? image : null}
            onClick={() => inputRef.current.click()}
          />
          {progress ? (
            <div className="profile__progress">
              <ActivityIndicator />
            </div>
          ) : null}
          {loading ? (
            <div className="profile__progress">
              <ActivityIndicator />
            </div>
          ) : null}
        </div>
        <IconButton
          className="profile__btn"
          title="open pictures"
          onClick={() => inputRef.current.click()}
        >
          <input
            type="file"
            ref={inputRef}
            hidden
            accept="image/*"
            multiple={false}
            onChange={handleChange}
          />
          <AiFillCamera className="profile__btn__icon" />
        </IconButton>
      </div>
      <div className="profile__input">
        <p className="profile__input__message">
          This username will be public and visible to everyone.
        </p>
        <div
          className={`profile__input__field ${
            usernameError ? "profile__input__field--error" : ""
          }`}
        >
          <BsPersonCheck className="login__input__icon" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
        </div>
        <p>{usernameError}</p>
      </div>
      <div className="profiles__buttons">
        <button type="submit" onClick={createAccount}>
          CREATE ACCOUNT {loadingCreate ? <ActivityIndicator /> : null}
        </button>
        <div />
        <button type="submit" onClick={() => setCardToMount("register")}>
          GO BACK
        </button>
      </div>
    </form>
  );
};

export default Profile;
