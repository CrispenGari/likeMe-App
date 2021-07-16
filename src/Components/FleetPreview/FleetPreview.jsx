import "./FleetPreview.css";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ActivityIndicator } from "../Common";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import { v4 as uuid_v4 } from "uuid";
const FleetPreview = ({ fleetImage, setFleetImage }) => {
  const user = useSelector((state) => state.user);
  const [posting, setPosting] = React.useState(true);
  const [caption, setCaption] = React.useState("");
  const closeForm = () => {
    setFleetImage(null);
    setCaption("");
    setPosting(false);
  };

  const post = (e) => {
    e.preventDefault();
    if (fleetImage) {
      const postImageName = `${uuid_v4(10)}_${user?.uid}`;
    }
  };
  return (
    <div className="fleet__preview">
      <div className="fleet__preview__top">
        <div />
        <h1>@{user?.displayName}</h1>
        <IconButton
          title="close"
          className="form__close__button"
          onClick={closeForm}
        >
          <AiFillCloseCircle className="form__close__button__icon" />
        </IconButton>
      </div>
      <div className="fleet__preview__image__container">
        <img src={fleetImage} alt="fleet" loading="lazy" />
        <div className="fleet__preview__details">
          {posting ? <ActivityIndicator size={40} content={"100%"} /> : null}
        </div>
      </div>
      <form onSubmit={post} className="fleet__preview__bottom">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          placeholder="type caption..."
        />
        <button type="submit">
          post {posting ? <ActivityIndicator size={15} /> : null}
        </button>
      </form>
    </div>
  );
};

export default FleetPreview;
