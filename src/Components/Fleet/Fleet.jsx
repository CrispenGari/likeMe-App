import React, { useRef } from "react";
import "./Fleet.css";
import { Avatar, IconButton } from "@material-ui/core";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";

const Fleet = ({ isUserMe, user, setFleetImage }) => {
  const allFleets = useSelector((state) => state.fleets);
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

  const fleets = allFleets?.filter(
    (fleet) => fleet.displayName === user?.displayName
  );
  if (isUserMe) {
    return (
      <div className="fleet">
        {fleets[0]?.fleetURL ? <img src={fleets[0]?.fleetURL} alt="" /> : null}
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
      {fleets[0]?.fleetURL ? <img src={fleets[0]?.fleetURL} alt="" /> : null}
      <div className="fleet__avatar__container">
        <Avatar
          className="fleet__avatar"
          src={user?.photoURL}
          alt={user?.displayName}
        />
      </div>
    </div>
  );
};

export default Fleet;
