import React from "react";
import "./Center.css";
import { IoIosShareAlt } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite, GetApp } from "@material-ui/icons";
const Center = () => {
  return (
    <div className="center">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/likeme-a104d.appspot.com/o/fleets%2Ff612f439-91b6-4a7d-9891-f21cadf12800_SSxRdkrmtBSTpEkKjjQUA6o1BWD2?alt=media&token=10182699-a1b0-404b-8f9d-d45e59049bfb"
        alt=""
      />
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
        <div>
          <IconButton title="react">
            <Favorite className="center__controls__icon__like" />
          </IconButton>
          <div className="center__controls__stats">4</div>
        </div>
      </div>
    </div>
  );
};

export default Center;
