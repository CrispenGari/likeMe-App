import React from "react";
import "./Comments.css";
import { Comment } from "../../Components";
const Comments = ({ setOpen, comments, postId }) => {
  return (
    <div className="comments">
      <h1>
        All Comments{" "}
        <button onClick={() => setOpen(false)}>Hide Comments</button>
      </h1>
      {comments.map((comment) => {
        return <Comment key={comment?.id} comment={comment} postId={postId} />;
      })}
    </div>
  );
};

export default Comments;
