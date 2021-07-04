import "./Profile.css";
import { AiFillCamera } from "react-icons/ai";
import { Avatar, IconButton, CircularProgress } from "@material-ui/core";
import { useRef, useState } from "react";
import firebase from "../../backend";

const Profile = ({ setCardToMount, credentials, setCredentials }) => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const createAccount = (e) => {
    e.preventDefault();
    if (username.length < 5) {
      return setUsernameError("username must contain at least 5 characters");
    }
    firebase.db
      .collection("users")
      .where("displayName", "==", username)
      .get()
      .then((doc) => {
        if (doc.docs.length > 0) {
          setUsernameError("the username is already taken by someone.");
        } else {
          setUsernameError("");
          const userCredentials = {
            ...credentials,
            username: username,
          };
          if (!userCredentials.email && !userCredentials.password) {
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
                            displayName: username,
                            photoURL: url,
                          })
                          .then(() => {
                            const { displayName, email, photoURL } =
                              authUser.user;
                            firebase.db.collection("users").add({
                              displayName: displayName,
                              email: email,
                              photoURL: photoURL,
                              phoneNumber: null,
                            });
                          });
                      })
                      .catch((error) => setUsernameError(error.message))
                      .finally(() => {
                        setCredentials({});
                        setImage(null);
                        setProgress(0);
                        setUsernameError("");
                        setUsername("");
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
                    displayName: username,
                    photoURL: null,
                  })
                  .then(() => {
                    const { displayName, email, photoURL } = authUser.user;
                    firebase.db.collection("users").add({
                      displayName: displayName,
                      email: email,
                      photoURL: photoURL,
                      phoneNumber: null,
                    });
                  });
              })
              .catch((error) => setUsernameError(error.message))
              .finally(() => {
                setCredentials({});
                setImage(null);
                setProgress(0);
                setUsernameError("");
                setUsername("");
              });
          }
        }
      });
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <form className="profile">
      <h1>Create a public profile</h1>
      <div className="profile__avatar__container">
        <div className="profile__avatar__container__cover">
          <Avatar
            className="profile__avatar"
            src={image ? image : null}
            onClick={() => inputRef.current.click()}
          />
          {progress ? (
            <div className="profile__progress">
              <CircularProgress
                className="profile__avatar__progress"
                variant="determinate"
                value={progress}
                color="secondary"
                size={30}
              />
            </div>
          ) : null}
        </div>
        <IconButton
          className="profile__btn"
          onClick={() => inputRef.current.click()}
        >
          <input
            type="file"
            ref={inputRef}
            hidden
            accept="images/*"
            multiple={false}
            onChange={handleChange}
          />
          <AiFillCamera className="profile__btn__icon" />
        </IconButton>
      </div>
      <div className="profile__input">
        <div className="profile__input__field">
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
          CREATE ACCOUNT
        </button>
        <button type="submit" onClick={() => setCardToMount("register")}>
          GO BACK
        </button>
      </div>
    </form>
  );
};

export default Profile;
