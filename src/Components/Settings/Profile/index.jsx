import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AiFillCamera } from "react-icons/ai";
import { ActivityIndicator } from "../../Common";
import { FiCameraOff } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import firebase from "../../../backend";
import { useFollowers, useFollowings } from "../../../hooks";

import helperFunctions from "../../../utils/helperfunctions";
import { v4 as uuid_v4 } from "uuid";
import { VerifiedBadge } from "../../Common";

const Profile = () => {
  const inputRef = React.useRef(null);
  const history = useHistory();
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) =>
    state?.users?.find((_user) => _user?.id === uid)
  );

  useFollowings(uid);
  useFollowers(uid);
  const followings = useSelector((state) => state.followings);
  const followers = useSelector((state) => state.followers);

  const updateOnlyProfile = async () => {
    setLoading(true);
    if (image === null) {
      await firebase.auth.currentUser
        .updateProfile({
          photoURL: image,
        })
        .then(() => {
          firebase.db
            .collection("users")
            .doc(uid)
            .update({
              photoURL: image,
            })
            .then(() => {})
            .catch((error) => {
              return error;
            });
        })
        .catch((error) => {
          return error;
        })
        .finally(() => setLoading(false));
      return;
    }
    if (String(image).startsWith("http") === true) {
      return; // No changes made
    } else {
      const childName = `${currentUser?.displayName
        ?.trim()
        .toLowerCase()}_${uuid_v4()}`;
      const uploadTask = firebase.storage
        .ref(`profiles/${childName}`)
        .putString(image, "data_url");
      await uploadTask.on(
        "state_changed",
        (obs) => {
          // Ingnore the observer
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
                })
                .then(() => {
                  firebase.db.collection("users").doc(uid).update({
                    photoURL: url,
                  });
                })
                .then(() => {
                  firebase.db.collection("profiles").add({
                    profile: url,
                    timestamp: firebase.timestamp,
                    displayName: currentUser?.displayName,
                    email: currentUser?.email,
                    userId: currentUser?.id,
                  });
                });
            })
            .then(() => {
              return {
                status: 201,
              };
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        }
      );
    }
  };

  const [image, setImage] = useState(
    currentUser?.photoURL ? currentUser?.photoURL : null
  );

  const removeProfile = () => {
    setImage(null);
  };

  const logout = () => {
    history.replace("/");
    firebase.auth.signOut();
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

  const posts = useSelector((state) => state.posts).filter(
    (post) => post?.userId === uid
  );
  const banners = useSelector((state) => state.banners).filter(
    (banner) => banner?.userId === uid
  );
  const profiles = useSelector((state) => state.profiles)?.filter(
    (profile) => profile?.userId === uid
  );
  const tags = [];

  const displayPost = [...posts, ...banners, ...profiles, ...tags];

  useEffect(() => {
    setImage(currentUser?.photoURL ? currentUser?.photoURL : null);
  }, [currentUser]);
  return (
    <div className="settings__profile">
      <div className="settings__profile__left">
        <div>
          {loading ? (
            <div className="settings__profile__left__loading">
              <ActivityIndicator size={20} />
            </div>
          ) : null}
          <Avatar
            className="settings__profile__avatar"
            src={image ? image : null}
            onClick={() => inputRef.current.click()}
          />
        </div>
        <div className="settings__profile__left__buttons">
          <IconButton
            className="profile__btn"
            title="open pictures"
            onClick={() => inputRef.current.click()}
            disabled={Boolean(loading)}
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
          <IconButton
            disabled={Boolean(loading)}
            onClick={removeProfile}
            title="remove profile"
          >
            <FiCameraOff />
          </IconButton>
        </div>
        <button onClick={updateOnlyProfile}>update</button>
      </div>
      <div className="settings__profile__right">
        <p className="username__holder">
          @{currentUser?.displayName}
          {currentUser?.userVerified ? <VerifiedBadge /> : null}
        </p>
        <div>
          <div className="settings__profile__stats__item">
            <h1>{helperFunctions.numberFormat(followings?.length)}</h1>
            <p>followings</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>{helperFunctions.numberFormat(followers?.length)}</h1>
            <p>followers</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>324</h1>
            <p>likes</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>{helperFunctions.numberFormat(displayPost?.length)}</h1>
            <p>posts</p>
          </div>
        </div>
        <button onClick={logout} disabled={Boolean(loading)}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
