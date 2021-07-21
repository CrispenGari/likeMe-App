import "./Input.css";

import React from "react";

const Input = ({
  Icon,
  value,
  setValue,
  label,
  focus,
  placeholder,
  options,
  inputError,
}) => {
  return (
    <div className="edit__profile__input">
      <label htmlFor="editInput">{label}</label>
      <div className="edit__profile__input__container">
        {!options ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder={placeholder}
            autoFocus={focus ?? false}
          />
        ) : (
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
      <p className="error">{inputError}</p>
    </div>
  );
};

export default Input;
