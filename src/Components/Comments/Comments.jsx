import React from "react";
import "./Comments.css";
import { Comment } from "../../Components";
import { Modal } from "@material-ui/core";
import Header from "./Header/Header";
import Input from "./Input/Input";
const Comments = ({ openComments, setOpenComments }) => {
  return (
    <Modal
      className="comments"
      open={openComments}
      onClose={() => setOpenComments(false)}
    >
      <div className="comments__container">
        <Header />
        <div className="comments__lists">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <Input />
      </div>
    </Modal>
  );
};

export default Comments;
