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
  isDate,
  isBio,
  help,
}) => {
  return (
    <div className="edit__profile__input">
      <label htmlFor="editInput">{label}</label>
      <div className="edit__profile__input__container">
        {options ? (
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : isDate ? (
          <input
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : isBio ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder={placeholder}
            autoFocus={focus ?? false}
          />
        )}
      </div>
      <p className="error">{inputError}</p>
      <p className="edit__input__help">{help}</p>
    </div>
  );
};

export default Input;
