import React from "react";
import "./Center.css";
import { IoIosShareAlt } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite, GetApp } from "@material-ui/icons";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

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
            <IconButton title="delete">
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
