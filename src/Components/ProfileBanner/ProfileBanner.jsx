import "./ProfileBanner.css";
import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useRef } from "react";
import { ActivityIndicator } from "../Common";

import firebase from "../../backend";
import Image from "../Image/Image";
import { useSelector } from "react-redux";
import { v4 as uuid_v4 } from "uuid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ProfileBanner = () => {
  const inputRef = useRef(null);

  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.users)?.find(
    (_user) => _user?.id === uid
  );

  const [image, setImage] = useState(null);
  const [openPicture, setOpenPicture] = useState(false);
  const [banner, setBanner] = useState(
    currentUser?.banner ? currentUser?.banner : null
  );
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBanner(currentUser?.banner ? currentUser?.banner : null);
  }, [currentUser]);

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setLoading(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setBanner(event.target.result);
      setLoading(false);
    };
  };
  const cancel = () => {
    setBanner(currentUser?.banner ? currentUser?.banner : null);
    setLoading(false);
    setProgress(0);
  };

  useEffect(() => {
    if (loading) {
    }
  }, [loading]);

  const changeBanner = () => {
    if (banner) {
      // Upload to storage
      const postImageName = `${uuid_v4(10)}_${user?.uid}`;
      const task = firebase.storage
        .ref("banners/" + postImageName)
        .putString(banner, "data_url");
      task.on(
        "state_changed",
        (observer) => {
          setProgress(
            ((observer.bytesTransferred / observer.totalBytes) * 100).toFixed(0)
          );
        },
        (error) => {
          console.error(error);
        },
        () => {
          firebase.storage
            .ref("banners")
            .child(postImageName)
            .getDownloadURL()
            .then((url) => {
              // update the user's collection
              firebase.db
                .collection("users")
                .doc(user?.uid)
                .set(
                  {
                    banner: url,
                  },
                  { merge: true }
                )
                .then(() => {})
                .catch((err) => console.error(err));
              // create banners collections
              firebase.db
                .collection("banners")
                .doc(postImageName)
                .set({
                  banner: url,
                  displayName: user?.displayName,
                  email: user?.email,
                  timestamp: firebase.timestamp,
                  userId: user?.uid,
                })
                .catch((error) => console.log(error))
                .finally(() => {
                  cancel();
                });
            });
        }
      );
    } else {
      return;
    }
    return;
  };
  return (
    <div
      className="profile__banner"
      style={
        banner
          ? {
              backgroundImage: `url("${banner}")`,
              backgroundColor: "#4364A0",
            }
          : {}
      }
    >
      <Image
        image={image}
        setImage={setImage}
        open={openPicture}
        setOpen={setOpenPicture}
      />
      <div className="profile__banner__logo">
        <div className="banner__activity__indicator">
          {loading ? <ActivityIndicator size={35} /> : null}
          {progress ? (
            <ActivityIndicator
              size={35}
              content={`${Number(progress).toFixed(0)}%`}
            />
          ) : null}
        </div>
        <h1>LIKEME</h1>
        <p>@{currentUser?.displayName}</p>
        <div className="profile__banner__username__banner">
          <p>
            I'm single and searching. Looking for a serious relationship and
            settle down.
          </p>
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*"
        multiple={false}
        onChange={handleChange}
      />
      {uid === user?.uid ? (
        <div className="profile__banner__buttons__container">
          {String(banner)?.startsWith("data:image/") ? (
            <div>
              <button title="change background" onClick={cancel}>
                Cancel
              </button>
              <button title="change background" onClick={changeBanner}>
                Save
              </button>
            </div>
          ) : (
            <button
              title="change background"
              onClick={() => inputRef.current.click()}
            >
              Edit
            </button>
          )}
        </div>
      ) : null}

      <div className="profile__banner__container">
        <Avatar
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          className="profile__banner__avatar"
          onClick={() => {
            setImage({ imageURL: currentUser?.photoURL, picture: "post" });
            setOpenPicture(true);
          }}
        />
      </div>
    </div>
  );
};

export default ProfileBanner;
