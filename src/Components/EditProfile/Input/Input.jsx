import "./Input.css";

import React from "react";

const Input = ({
  IconRight,
  IconLeft,
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
  customRef,
  type,
  setShowPasswordIcon,
}) => {
  return (
    <div className="edit__profile__input">
      <label htmlFor="editInput">{label}</label>
      <div className="edit__profile__input__container">
        {IconLeft ? (
          <IconLeft className="edit__profile__input__icon__left" />
        ) : null}

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
            type={type === "password" ? "password" : "text"}
            placeholder={placeholder}
            autoFocus={focus ?? false}
            ref={customRef}
          />
        )}
        {IconRight ? (
          <div
            onClick={() => {
              if (customRef?.current?.getAttribute("type") === "text") {
                customRef?.current?.setAttribute("type", "password");
              } else {
                customRef?.current?.setAttribute("type", "text");
              }
              setShowPasswordIcon((prev) => !prev);
            }}
          >
            <IconRight className="edit__profile__input__icon__right" />
          </div>
        ) : null}
      </div>
      <p className="error">{inputError}</p>
      <p className="edit__input__help">{help}</p>
    </div>
  );
};

export default Input;
