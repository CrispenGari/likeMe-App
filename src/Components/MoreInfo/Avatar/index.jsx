import React, { useState, useRef } from "react";
import "./Avatar.css";
import { AiFillCamera } from "react-icons/ai";
import { Avatar as A, IconButton } from "@material-ui/core";
import { ActivityIndicator } from "../../Common";
import { FiCameraOff } from "react-icons/fi";
const Avatar = ({ image, progress, handleChange, setImage, loading }) => {
  const inputRef = useRef(null);

  return (
    <div className="more__info__avatar__container">
      <p className="more__info__input__message">Create an Avatar</p>
      <div className="more__info__avatar__container__cover">
        <A
          className="more__info__avatar"
          src={image ? image : null}
          onClick={() => inputRef.current.click()}
        />
        {progress ? (
          <div className="more__info__progress">
            <ActivityIndicator />
          </div>
        ) : null}
        {loading ? (
          <div className="more__info__progress">
            <ActivityIndicator />
          </div>
        ) : null}
      </div>
      <div className="more__info__avatar__buttons">
        <IconButton
          className="more__info__btn"
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
          <AiFillCamera className="more__info__btn__icon" />
        </IconButton>
        <IconButton
          onClick={() => setImage(null)}
          className="profile__btn"
          title="remove image"
        >
          <FiCameraOff />
        </IconButton>
      </div>
    </div>
  );
};

export default Avatar;
