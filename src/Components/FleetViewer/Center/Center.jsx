import React from "react";
import "./Center.css";
import { IoIosShareAlt } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite, GetApp } from "@material-ui/icons";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Center = ({ fleets, setCurrentFleetIndex, currentFleetIndex }) => {
  const currentUser = useSelector((state) => state.user);

  return (
    <div className="center">
      <img src={fleets[currentFleetIndex]?.fleetURL} alt="" />
      <p className="center__caption">{fleets[currentFleetIndex]?.caption} </p>
      <div className="center__controls">
        <div>
          <IconButton title="share">
            <IoIosShareAlt className="center__controls__icon__share" />
          </IconButton>
          <div className="center__controls__stats">4</div>
        </div>
        <div>
          <IconButton title="download">
            <GetApp className="center__controls__icon__download" />
          </IconButton>
          <div className="center__controls__stats">4</div>
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
