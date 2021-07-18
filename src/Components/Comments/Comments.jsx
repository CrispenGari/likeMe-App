import React from "react";
import "./Comments.css";
import { Comment } from "../../Components";

const Comments = React.forwardRef(
  (
    { open, setOpen, comments, postId, postComment, setComment, comment },
    ref
  ) => {
    return (
      <div className="comments" ref={ref}>
        <h1>
          All Comments{" "}
          <button onClick={() => setOpen(false)}>Hide Comments</button>
        </h1>
        <div className="comments__container">
          {comments.map((comment) => {
            return (
              <Comment key={comment?.id} comment={comment} postId={postId} />
            );
          })}
        </div>
        <form className="post__bottom__comment__input">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Type your comment..."
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={(e) => {
              e.preventDefault();
              postComment();
            }}
          >
            post
          </button>
        </form>
      </div>
    );
  }
);

export default Comments;
