import React from "react";
import { MdSend } from "react-icons/md";
import "./Input.css";

const Input = () => {
  const replyComment = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={replyComment} className="comment__input__inline">
      <input placeholder="reply" />
      <button type="submit">
        <MdSend className="comment__input__inline__send__icon" />
      </button>
    </form>
  );
};

export default Input;
