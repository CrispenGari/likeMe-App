import React, { useEffect, useState } from "react";
import "./Fleet.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
const Fleet = ({ user, setCurrentFleets, openOthersFleets }) => {
  const fleets = useSelector((state) => state.fleets);
  const [userFleets, setUserFleets] = useState([]);
  const openFleets = () => {
    setCurrentFleets(
      fleets?.filter((fleet) => {
        return user?.data?.uid === fleet?.data?.userId;
      })
    );
    openOthersFleets();
  };
  useEffect(() => {
    setUserFleets(
      fleets?.filter((fleet) => {
        return user?.data?.uid === fleet?.data?.userId;
      })
    );
  }, [fleets, user?.data?.uid]);
  return (
    <div className="fleet">
      {userFleets?.length === 0 ? (
        <Avatar
          className="fleet__avatar--nofleets"
          src={user?.data?.photoURL}
          alt={user?.data?.displayName}
        />
      ) : (
        <Avatar
          className="fleet__avatar"
          src={userFleets[userFleets?.length - 1]?.data?.fleetURL}
          alt={user?.data?.displayName}
          onClick={openFleets}
        />
      )}
    </div>
  );
};

export default Fleet;
