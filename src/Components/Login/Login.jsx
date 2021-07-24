import React, { useRef, useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { CgLock } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import firebase from "../../backend";
import { ActivityIndicator } from "../Common";
import "./Login.css";
import { Avatar } from "@material-ui/core";
import { logos } from "../../utils/logos";
import { emailExp } from "../../utils/regularExpressions";
const Login = ({ setCardToMount }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localUser, setLocalUser] = useState(null);

  const login = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      firebase.auth
        .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
        .then((authUser) => {
          setError("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setPassword("");
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  React.useEffect(() => {
    let mounted = true;
    if (emailExp.test(email)) {
      firebase.db
        .collection("users")
        .where("email", "==", email.trim().toLowerCase())
        .get()
        .then((user) => {
          if (user.docs.length !== 0 && mounted) {
            setLocalUser({ id: user?.docs[0]?.id, ...user?.docs[0]?.data() });
          } else {
            setLocalUser(null);
          }
        });
    } else {
      setLocalUser(null);
    }
    return () => {
      mounted = false;
    };
  }, [email]);
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>

      <div className="login__avatar__container">
        <Avatar
          alt={localUser ? localUser?.displayName : "LikeMe"}
          src={localUser ? localUser?.photoURL : logos.main_logo}
          className="login__avatar"
        />
        <p>{localUser?.displayName}</p>
      </div>

      <div className="login__input">
        <div
          className={`login__input__field ${
            error && "login__input__form--error"
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
      </div>
      <div className="login__input">
        <div
          className={`login__input__field ${
            error && "login__input__form--error"
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
        <p>{error}</p>
      </div>
      <button type="submit" onClick={login}>
        LOGIN {!loading ? null : <ActivityIndicator />}
      </button>
      <p
        onClick={() => setCardToMount("reset")}
        className="login__forgot__password"
      >
        Forgot password?
      </p>
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
