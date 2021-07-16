import React, { useState, useEffect } from "react";
import "./Fleets.css";
import { Fleet } from "../../Components";
import { useSelector } from "react-redux";
const Fleets = ({ setFleetImage }) => {
  const user = useSelector((state) => state.user);
  const fleets = useSelector((state) => state.fleets);
  const myFleets = fleets?.filter(
    (fleet) => fleet.displayName === user?.displayName
  );

  return (
    <div className="fleets">
      <Fleet
        fleets={myFleets}
        isUserMe
        user={user}
        setFleetImage={setFleetImage}
      />
      <div className="fleets__container">
        <Fleet />
        <Fleet />
        <Fleet />
        <Fleet />
      </div>
    </div>
  );
};

export default Fleets;
