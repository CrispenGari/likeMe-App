import React from "react";
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import helperFunctions from "../../../utils/helperfunctions";
const Header = ({
  setDisplayName,
  fleets,
  setCurrentFleetIndex,
  currentFleetIndex,
  setFleetProgress,
  fleetProgress,
}) => {
  return (
    <div className="fleet__header">
      <div className="fleet__header__top">
        {fleets?.map((fleet) => (
          <div key={fleet?.id}>
            <span
              style={{
                width: `${fleetProgress / 5000}%`,
              }}
            ></span>
          </div>
        ))}
      </div>
      <div className="fleet__header__bottom">
        <div className="fleet__header__bottom__left">
          <Avatar className="fleet__header__avatar" />
          <div className="fleet__info">
            <p>@{fleets[currentFleetIndex]?.displayName}</p>
            {fleets && (
              <time>
                {helperFunctions.timeString(
                  helperFunctions.timestampToTime(
                    fleets[currentFleetIndex]?.timestamp
                  )
                )}
              </time>
            )}
          </div>
        </div>
        <div className="fleet__header__bottom__controls">
          <IconButton title="more">
            <FiMoreVertical className="fleet__header__bottom__icon" />
          </IconButton>
          <IconButton title="close" onClick={() => setDisplayName("")}>
            <AiFillCloseCircle className="form__close__button__icon" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
