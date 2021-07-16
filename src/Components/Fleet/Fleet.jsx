import React, { useRef } from "react";
import "./Fleet.css";
import { Avatar, IconButton } from "@material-ui/core";
import { IoAdd } from "react-icons/io5";
const Fleet = ({ isUserMe, user, setFleetImage }) => {
  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setFleetImage(event.target.result);
    };
  };
  const inputRef = useRef(null);
  if (isUserMe) {
    return (
      <div className="fleet">
        <img
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg"
          alt=""
        />
        <input
          type="file"
          ref={inputRef}
          hidden
          accept="image/*"
          multiple={false}
          onChange={handleChange}
        />
        <div className="fleet__avatar__container">
          <Avatar
            className="fleet__avatar"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <IconButton title="add" onClick={() => inputRef.current.click()}>
            <IoAdd className="fleet__avatar__icon" />
          </IconButton>
        </div>
      </div>
    );
  }
  return (
    <div className="fleet">
      <Avatar className="fleet__avatar" />
    </div>
  );
};

export default Fleet;
