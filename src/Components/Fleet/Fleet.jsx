import React, { useRef } from "react";
import "./Fleet.css";
import { Avatar, IconButton } from "@material-ui/core";
import { IoAdd } from "react-icons/io5";
const Fleet = ({ isUserMe, user, setFleetImage, fleets }) => {
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
        <img src={fleets[0]?.fleetURL} alt="" />
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
