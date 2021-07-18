import React, { useState, useEffect } from "react";
import "./Fleets.css";
import { Fleet } from "../../Components";
import { useSelector } from "react-redux";
import FleetViewer from "../FleetViewer/FleetViewer";

const Fleets = ({ setFleetImage }) => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users)?.filter(
    (_user) => user?.uid !== _user?.id
  );
  const fleets = useSelector((state) => state.fleets);
  const myFleets = fleets?.filter(
    (fleet) => fleet.displayName === user?.displayName
  );

  const [displayName, setDisplayName] = useState("");

  return (
    <>
      <div className="fleets">
        <Fleet
          fleets={myFleets}
          isUserMe
          user={user}
          setFleetImage={setFleetImage}
          setDisplayName={setDisplayName}
        />
        <div className="fleets__container">
          {users?.map((_user) => (
            <Fleet
              key={_user?.id}
              user={_user}
              setDisplayName={setDisplayName}
            />
          ))}
        </div>
      </div>
      <FleetViewer displayName={displayName} setDisplayName={setDisplayName} />
    </>
  );
};

export default Fleets;
