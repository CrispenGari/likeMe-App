import React, { useState, useEffect } from "react";
import "./Fleets.css";
import { Fleet } from "../../Components";
import { useSelector } from "react-redux";
const Fleets = ({ setFleetImage }) => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users)?.filter(
    (_user) => user?.uid !== _user?.id
  );
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
        {users?.map((_user) => (
          <Fleet key={_user?.id} user={_user} />
        ))}
      </div>
    </div>
  );
};

export default Fleets;
