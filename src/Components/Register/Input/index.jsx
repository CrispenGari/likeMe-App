import React from "react";

const Input = ({
  inputError,
  value,
  setValue,
  inputRef,
  LeftIcon,
  RightIcon,
  type,
  label,
  placeholder,
  focus,
  changeInputType,
  rightIconTitle,
}) => {
  return (
    <div className="register__input">
      <label>
        {label} <span>*</span>
      </label>
      <div className={`register__input__field`}>
        {LeftIcon ? <LeftIcon className="login__input__icon" /> : null}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          autoFocus={focus}
        />
        {RightIcon ? (
          <RightIcon
            title={rightIconTitle}
            className="register__input__field__icon"
            onClick={() => {
              if (inputRef.current.getAttribute("type") === "password") {
                inputRef.current.setAttribute("type", "text");
                changeInputType(true);
              } else {
                inputRef.current.setAttribute("type", "password");
                changeInputType(false);
              }
            }}
          />
        ) : null}
      </div>
      <p>{inputError}</p>
    </div>
  );
};

export default Input;
