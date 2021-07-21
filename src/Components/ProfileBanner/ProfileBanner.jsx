import "./ProfileBanner.css";
import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useEffect } from "react";

import firebase from "../../backend";
import { useParams } from "react-router-dom";
import Image from "../Image/Image";

const ProfileBanner = () => {
  const [user, setUser] = useState(null);
  const { uid } = useParams();
  const [image, setImage] = useState(null);
  const [openPicture, setOpenPicture] = useState(false);

  useEffect(() => {
    if (uid)
      firebase.db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          setUser({
            ...doc.data(),
            id: uid,
          });
        });
  }, [uid]);

  return (
    <div className="profile__banner">
      <Image
        image={image}
        setImage={setImage}
        open={openPicture}
        setOpen={setOpenPicture}
      />
      <div className="profile__banner__logo">
        <h1>LIKEME</h1>
        <p>@{user?.displayName}</p>
        <div className="profile__banner__username__banner">
          <p>
            I'm single and searching. Looking for a serious relationship and
            settle down.
          </p>
        </div>
      </div>

      <button>Edit</button>
      <div className="profile__banner__container">
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          className="profile__banner__avatar"
          onClick={() => {
            setImage({ imageURL: user?.photoURL, picture: "post" });
            setOpenPicture(true);
          }}
        />
      </div>
    </div>
  );
};

export default ProfileBanner;
