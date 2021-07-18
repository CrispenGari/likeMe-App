import React from "react";
import "./Input.css";
const Input = ({ fleets, setCurrentFleetIndex, currentFleetIndex }) => {
  return (
    <form className="fleet__viewer__input">
      <input
        type="text"
        placeholder={`reply to this fleet @${fleets[currentFleetIndex]?.displayName}...`}
      />
      <button>send</button>
    </form>
  );
};

export default Input;
