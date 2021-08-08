import React from "react";
import "./Center.css";
import { IoIosShareAlt } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite, GetApp } from "@material-ui/icons";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import firebase from "../../../backend";
const Center = ({ fleets, setCurrentFleetIndex, currentFleetIndex }) => {
  const currentUser = useSelector((state) => state.user);
  const next = () => {
    if (fleets?.length - 1 === currentFleetIndex) {
      setCurrentFleetIndex(0);
    } else {
      setCurrentFleetIndex((prev) => prev + 1);
    }
  };
  const prev = () => {
    if (currentFleetIndex === 0) {
      setCurrentFleetIndex(fleets?.length - 1);
    } else {
      setCurrentFleetIndex((prev) => prev - 1);
    }
  };
  React.useEffect(() => {
    if (currentUser?.displayName !== fleets[currentFleetIndex]?.displayName) {
      firebase.db
        .collection("fleets")
        .doc(fleets[currentFleetIndex]?.id)
        .collection("viewers")
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          if (Boolean(doc?.docs?.length > 0)) {
            return;
          } else {
            // New Viewer
            firebase.db
              .collection("fleets")
              .doc(fleets[currentFleetIndex]?.id)
              .collection("viewers")
              .doc(currentUser?.uid)
              .set({
                timestamp: firebase.timestamp,
                displayName: currentUser?.displayName,
                userId: currentUser?.uid,
                photoURL: currentUser?.photoURL,
                email: currentUser?.email,
              });
          }
        });
    }
  }, [fleets, currentFleetIndex]);

  const deleteFleet = () => {
    firebase.db
      .collection("fleets")
      .doc(fleets[currentFleetIndex]?.id)
      .delete();
  };

  return (
    <div className="center">
      <IconButton title="previous" onClick={prev}>
        <BiChevronLeft className="center__controls__icon__nav" />
      </IconButton>
      <IconButton title="next" onClick={next}>
        <BiChevronRight className="center__controls__icon__nav" />
      </IconButton>
      <img src={fleets[currentFleetIndex]?.fleetURL} alt="" />
      <p className="center__caption">{fleets[currentFleetIndex]?.caption} </p>
      <div className="center__controls">
        <div>
          <IconButton title="share">
            <IoIosShareAlt className="center__controls__icon__share" />
          </IconButton>
        </div>
        <div>
          <IconButton title="download">
            <GetApp className="center__controls__icon__download" />
          </IconButton>
        </div>
        {fleets[currentFleetIndex]?.displayName === currentUser?.displayName ? (
          <div>
            <IconButton title="delete" onClick={deleteFleet}>
              <MdDelete className="center__controls__icon__delete" />
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton title="react">
              <Favorite className="center__controls__icon__like" />
            </IconButton>
            <div className="center__controls__stats">4</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Center;
