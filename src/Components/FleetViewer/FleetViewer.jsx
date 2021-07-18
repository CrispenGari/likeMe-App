import "./FleetViewer.css";
import { Modal } from "@material-ui/core";
import Input from "./Input/Input";
import Center from "./Center/Center";
import Header from "./Header/Header";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const FleetViewer = ({ displayName, setDisplayName }) => {
  const fleets = useSelector((state) => state.fleets).filter(
    (fleet) => fleet?.displayName === displayName
  );
  const [currentFleetIndex, setCurrentFleetIndex] = React.useState(0);

  const [fleetProgress, setFleetProgress] = React.useState(0);
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setFleetProgress((prev) => prev + 500);
    }, 500);
    if (fleetProgress / 500 === 5) {
      setFleetProgress(0);
      if (fleets?.length - 1 === currentFleetIndex) {
        setDisplayName("");
      } else {
        setCurrentFleetIndex((prev) => prev + 1);
      }
    }
    return () => {
      clearInterval(timeoutId);
    };
  }, [fleets, fleetProgress]);
  return (
    <Modal
      open={displayName !== "" && fleets?.length > 0}
      onClose={() => setDisplayName("")}
      className="fleet__viewer"
    >
      <div className="fleet__viewer__container">
        <div className="fleet__viewer__header">
          <Header
            setFleetProgress={setFleetProgress}
            fleetProgress={fleetProgress}
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
        <div className="fleet__viewer__bottom">
          <Input
            fleets={fleets}
            setCurrentFleetIndex={setCurrentFleetIndex}
            currentFleetIndex={currentFleetIndex}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FleetViewer;
