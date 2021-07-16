import "./FleetPreview.css";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ActivityIndicator } from "../Common";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
const FleetPreview = ({ image }) => {
  const user = useSelector((state) => state.user);

  const closeForm = () => {};
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
        <img src={image} alt="fleet" loading="lazy" />
        <div className="fleet__preview__details">
          <ActivityIndicator size={30} />
        </div>
      </div>
      <form className="fleet__preview__bottom">
        <input type="text" placeholder="type caption..." />
        <button>post</button>
      </form>
    </div>
  );
};

export default FleetPreview;
