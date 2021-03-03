import React from "react";
import "./Comments.css";
import { Comment } from "../../Components";
const Comments = ({ setShowComments, comments, postId }) => {
  return (
    <div className="comments">
      <h1>All Comments</h1>
      {comments.map((comment) => {
        return <Comment key={comment?.id} comment={comment}  postId={postId}/>;
      })}
      <button onClick={() => setShowComments(false)}>Hide Comments</button>
    </div>
  );
};

export default Comments;
