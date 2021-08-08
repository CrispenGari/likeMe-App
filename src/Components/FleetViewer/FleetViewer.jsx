import "./FleetViewer.css";
import { Modal } from "@material-ui/core";
import Input from "./Input/Input";
import Center from "./Center/Center";
import Header from "./Header/Header";
import React from "react";
import { useSelector } from "react-redux";
import Viewers from "./Viewers/Viewers";
import { ActivityIndicator } from "../Common";

const FleetViewer = ({ displayName, setDisplayName }) => {
  const fleets = useSelector((state) => state.fleets).filter(
    (fleet) => fleet?.displayName === displayName
  );
  const [currentFleetIndex, setCurrentFleetIndex] = React.useState(0);
  const currentUser = useSelector((state) => state.user);
  return (
    <Modal
      open={displayName !== "" && fleets?.length > 0}
      onClose={() => {
        setDisplayName("");
        setCurrentFleetIndex(0);
      }}
      className="fleet__viewer"
    >
      {fleets ? (
        <div className="fleet__viewer__container">
          <div className="fleet__viewer__header">
            <Header
              setDisplayName={setDisplayName}
              fleets={fleets}
              setCurrentFleetIndex={setCurrentFleetIndex}
              currentFleetIndex={currentFleetIndex}
            />
          </div>
          <div className="fleet__viewer__center">
            <Center
              fleets={fleets}
              setCurrentFleetIndex={setCurrentFleetIndex}
              currentFleetIndex={currentFleetIndex}
            />
          </div>
          {fleets[currentFleetIndex]?.displayName !==
          currentUser?.displayName ? (
            <div className="fleet__viewer__bottom">
              <Input
                fleets={fleets}
                setCurrentFleetIndex={setCurrentFleetIndex}
                currentFleetIndex={currentFleetIndex}
              />
            </div>
          ) : (
            <Viewers fleets={fleets} currentFleetIndex={currentFleetIndex} />
          )}
        </div>
      ) : (
        <ActivityIndicator />
      )}
    </Modal>
  );
};

export default FleetViewer;
