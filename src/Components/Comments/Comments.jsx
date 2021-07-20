import React from "react";
import "./Comments.css";
import { Comment } from "../../Components";
import { Modal } from "@material-ui/core";
import Header from "./Header/Header";
import Input from "./Input/Input";
const Comments = ({ post, openComments, setOpenComments, comments }) => {
  return (
    <Modal
      className="comments"
      open={openComments}
      onClose={() => setOpenComments(false)}
    >
      <div className="comments__container">
        <Header post={post} setOpenComments={setOpenComments} />
        <div className="comments__lists">
          {comments?.map((comment) => (
            <Comment post={post} comment={comment} key={comment?.id} />
          ))}
        </div>
        <Input post={post} />
      </div>
    </Modal>
  );
};

export default Comments;
