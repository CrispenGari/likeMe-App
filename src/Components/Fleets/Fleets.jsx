import React, { useState } from "react";
import "./Fleets.css";
import { Fleet } from "../../Components";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import FleetViewer from "../FleetViewer/FleetViewer";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const Fleets = ({ setFleetImage, title }) => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users)?.filter(
    (_user) => user?.uid !== _user?.id
  );

  const fleets = useSelector((state) => state.fleets);
  const myFleets = fleets?.filter(
    (fleet) => fleet.displayName === user?.displayName
  );

  const [displayName, setDisplayName] = useState("");
  const scrollRef = React.useRef(null);
  const navigateLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -100,
      behavior: "smooth",
    });
  };
  const navigateRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };
  return (
    <>
      {title ? <p className="fleets__header">{title}</p> : null}
      <div className="fleets">
        {!title ? (
          <Fleet
            fleets={myFleets}
            isUserMe
            user={user}
            setFleetImage={setFleetImage}
            setDisplayName={setDisplayName}
          />
        ) : null}
        <IconButton
          className={`fleets__nav__button__left ${
            title ? "" : "fleets__nav__button__left__no--title"
          }`}
          onClick={navigateLeft}
        >
          <BiChevronLeft />
        </IconButton>
        <div className="fleets__container" ref={scrollRef}>
          {users?.map((_user) => (
            <Fleet
              key={_user?.id}
              user={_user}
              setDisplayName={setDisplayName}
            />
          ))}
        </div>
        <IconButton
          className="fleets__nav__button__right"
          onClick={navigateRight}
        >
          <BiChevronRight />
        </IconButton>
      </div>

      <FleetViewer displayName={displayName} setDisplayName={setDisplayName} />
    </>
  );
};

export default Fleets;
