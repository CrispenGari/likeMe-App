import "./Avatar.css";
import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { Avatar as A, IconButton } from "@material-ui/core";
import { ActivityIndicator } from "../../Common";
import { FiCameraOff } from "react-icons/fi";
const Avatar = ({
  inputRef,
  handleChange,
  image,
  progress,
  loading,
  setImage,
}) => {
  const removeProfile = () => {
    setImage(null);
  };

  return (
    <div className="profile__avatar__container">
      <p className="profile__input__message">
        This profile picture will be visible to everyone. Setting it is
        optional.
      </p>
      <div className="profile__avatar__container__cover">
        <A
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
      <div className="edit__profile__avatar__buttons">
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
    </div>
  );
};

export default Avatar;
