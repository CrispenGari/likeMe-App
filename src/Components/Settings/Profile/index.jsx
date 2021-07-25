import React, { useState } from "react";
import "./Profile.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AiFillCamera } from "react-icons/ai";
import { ActivityIndicator } from "../../Common";
import { FiCameraOff } from "react-icons/fi";
import { useSelector } from "react-redux";

const Profile = () => {
  const inputRef = React.useRef(null);

  const user = useSelector((state) => state.user);

  const currentUser = useSelector((state) =>
    state?.users?.find((_user) => _user?.id === user?.uid)
  );
  const [image, setImage] = useState(currentUser?.photoURL ?? null);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const removeProfile = () => {
    setImage(null);
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
    <div className="settings__profile">
      <div className="settings__profile__left">
        <Avatar
          className="settings__profile__avatar"
          src={image ? image : null}
          onClick={() => inputRef.current.click()}
        />
        <div className="settings__profile__left__buttons">
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
          <IconButton onClick={removeProfile} title="remove profile">
            <FiCameraOff />
          </IconButton>
        </div>
        <button>update</button>
      </div>
      <div className="settings__profile__right">
        <p>@{currentUser?.displayName}</p>
        <div>
          <div className="settings__profile__stats__item">
            <h1>324</h1>
            <p>followings</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>324</h1>
            <p>followers</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>324</h1>
            <p>likes</p>
          </div>
          <div className="settings__profile__stats__item">
            <h1>324</h1>
            <p>posts</p>
          </div>
        </div>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
