import "./Register.css";
import { useRef, useState, useEffect } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
const Register = ({ setCardToMount }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const phoneRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createAccount = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfPasswordError("the two password must match.");
    } else {
      setConfPasswordError("");
    }

    setCardToMount("profile");
  };
  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordMessage("password must have at least 6 characters.");
    } else {
      setPasswordMessage("");
    }
    const expression = RegExp(/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gim);
    if (email && !expression.test(email)) {
      setEmailError("invalid email address.");
    } else {
      setEmailError("");
    }
  }, [email, phoneNumber, password]);

  return (
    <form className="register" onSubmit={createAccount}>
      <h1>Register</h1>
      <div className="register__input">
        <label>
          email <span>*</span>
        </label>
        <div className="register__input__field">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            type="text"
            placeholder="email"
          />
        </div>
        <p>{emailError}</p>
      </div>
      <div className="register__input">
        <label>
          phone <span>?</span>
        </label>
        <div className="register__input__field">
          <input
            ref={phoneRef}
            type="text"
            placeholder="phone number (optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <p>{phoneError}</p>
      </div>
      <div className="register__input">
        <label>
          password <span>*</span>
        </label>
        <div className="register__input__field">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            type="password"
            placeholder="password"
          />
          {!showPassword ? (
            <IoMdEyeOff
              title="show password"
              onClick={() => {
                passwordRef.current.setAttribute("type", "text");
                setShowPassword(true);
              }}
              className="register__input__field__icon"
            />
          ) : (
            <IoMdEye
              title="hide password"
              onClick={() => {
                passwordRef.current.setAttribute("type", "password");
                setShowPassword(false);
              }}
              className="register__input__field__icon"
            />
          )}
        </div>
        <p>{passwordMessage}</p>
      </div>
      <div className="register__input">
        <label>
          confirm password <span>*</span>
        </label>
        <div className="register__input__field">
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!showConfPassword ? (
            <IoMdEyeOff
              title="show password"
              onClick={() => {
                confirmPasswordRef.current.setAttribute("type", "text");
                setShowConfPassword(true);
              }}
              className="register__input__field__icon"
            />
          ) : (
            <IoMdEye
              title="hide password"
              onClick={() => {
                confirmPasswordRef.current.setAttribute("type", "password");
                setShowConfPassword(false);
              }}
              className="register__input__field__icon"
            />
          )}
        </div>
        <p>{confPasswordError}</p>
      </div>
      <button type="submit" onClick={createAccount}>
        CONTINUE
      </button>
      <div className="register__bottom">
        <p>Already have an account?</p>
        <button onClick={() => setCardToMount("login")}>LOGIN</button>
      </div>
    </form>
  );
};

export default Register;
