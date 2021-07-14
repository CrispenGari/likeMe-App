import "./Register.css";
import { useRef, useState, useEffect } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { CgLock } from "react-icons/cg";
const Register = ({ setCardToMount, setCredentials }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createAccount = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("email is required.");
      return;
    } else {
      setConfPasswordError("");
    }
    if (!password) {
      setPasswordMessage("password is required.");
      return;
    }
    if (!confirmPassword) {
      setConfPasswordError("password is required");
    }
    if (password !== confirmPassword) {
      return setConfPasswordError("the two password must match.");
    } else {
      setConfPasswordError("");
    }

    if (!emailError && !passwordMessage && !confPasswordError) {
      setCredentials({
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setEmailError("");
      setShowPassword(false);
      setShowConfPassword(false);
      setCardToMount("profile");
      setConfPasswordError("");
    }
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
    if (confirmPassword) {
      setConfPasswordError("");
    }
  }, [email, password, confirmPassword]);

  return (
    <form className="register" onSubmit={createAccount}>
      <h1>Register</h1>
      <div className="register__input">
        <label>
          email <span>*</span>
        </label>
        <div
          className={`register__input__field ${
            emailError && "register__input__field--error"
          }`}
        >
          <HiOutlineMail className="login__input__icon" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            type="email"
            placeholder="email"
          />
        </div>
        <p>{emailError}</p>
      </div>
      <div className="register__input">
        <label>
          password <span>*</span>
        </label>
        <div
          className={`register__input__field ${
            passwordMessage && "register__input__field--error"
          }`}
        >
          <CgLock className="login__input__icon" />
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
        <div
          className={`register__input__field ${
            confPasswordError && "register__input__field--error"
          }`}
        >
          <CgLock className="login__input__icon" />
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
