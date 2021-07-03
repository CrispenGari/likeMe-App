import { useRef, useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import "./Login.css";
const Login = ({ setCardToMount }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = (e) => {
    e.preventDefault();
  };
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <div className="login__input">
        <div className="login__input__field">
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
      <div className="login__input">
        <div className="login__input__field">
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
              className="login__input__field__icon"
            />
          ) : (
            <IoMdEye
              title="hide password"
              onClick={() => {
                passwordRef.current.setAttribute("type", "password");
                setShowPassword(false);
              }}
              className="login__input__field__icon"
            />
          )}
        </div>
        <p>{passwordError}</p>
      </div>
      <button type="submit" onClick={login}>
        LOGIN
      </button>
      <div className="login__bottom">
        <p>New user to this App?</p>
        <button onClick={() => setCardToMount("register")}>
          CREATE ACCOUNT
        </button>
      </div>
    </form>
  );
};
export default Login;
