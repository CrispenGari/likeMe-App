import "./Input.css";

import React from "react";

const Input = () => {
  return (
    <form className="comment__input">
      <input placeholder="type your comment..." />
      <button>post</button>
    </form>
  );
};

export default Input;
