import React from "react";
import "./Input.css";
const Input = () => {
  return (
    <form className="fleet__viewer__input">
      <input type="text" placeholder="reply to this fleet @username..." />
      <button>send</button>
    </form>
  );
};

export default Input;
