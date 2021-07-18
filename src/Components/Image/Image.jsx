import "./Image.css";

import { IconButton, Modal } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";
const Image = ({ image, setImage, open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setImage(null);
      }}
      className="image__viewer"
    >
      <div className="image__viewer__container">
        <img
          src={image?.picture === "post" ? image?.imageURL : image?.photoURL}
          alt=""
        />
        <IconButton
          title="close"
          onClick={() => {
            setOpen(false);
            setImage(null);
          }}
        >
          <AiFillCloseCircle className="image__close__button__icon" />
        </IconButton>
      </div>
    </Modal>
  );
};

export default Image;
