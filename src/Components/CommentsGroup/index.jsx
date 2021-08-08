import React from "react";
import { Comment } from "../../Components";
import "./CommentsGroup.css";
const CommentsGroup = ({ comments, title, post }) => {
  if (comments?.length === 0) {
    return null;
  }
  return (
    <div className="comments__group">
      <div className="comments__group__breaker">
        <div /> <h1>{title}</h1>
        <div />
      </div>
      {comments?.map((comment) => (
        <Comment post={post} comment={comment} key={comment?.id} />
      ))}
    </div>
  );
};

export default CommentsGroup;
