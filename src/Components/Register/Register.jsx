import "./Register.css";
import { useRef, useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { CgLock } from "react-icons/cg";
import firebase from "../../backend";
import { emailExp, usernameExp } from "../../utils/regularExpressions";
import Input from "./Input";
import { BsPersonCheck } from "react-icons/bs";
import { ActivityIndicator } from "../Common";
import { useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
const Register = ({ setCardToMount }) => {
  const history = useHistory();
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
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);

  const createAccount = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("email is required.");
      return;
    } else {
      setEmailError("");
    }

    if (emailExp.test(email) === true) {
      setEmailError("");
    } else {
      return setEmailError("invalid email address.");
    }
    if (usernameExp.test(username) === false) {
      return setUsernameError("invalid username!");
    } else {
      setUsernameError("");
    }
    if (!password) {
      setPasswordMessage("password is required.");
      return;
    } else {
      setPasswordMessage("");
    }
    if (!confirmPassword) {
      return setConfPasswordError("password is required");
    } else {
      setConfPasswordError("");
    }
    if (password !== confirmPassword) {
      return setConfPasswordError("the two password must match.");
    } else {
      setConfPasswordError("");
    }

    if (
      !emailError &&
      !passwordMessage &&
      !confPasswordError &&
      !usernameError
    ) {
      setLoading(true);
      firebase.db
        .collection("users")
        .where("email", "==", email.trim().toLowerCase())
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            setEmailError("the email is already taken by someone!");
            setLoading(false);
            return;
          }
        })
        .then(() => {
          firebase.db
            .collection("users")
            .where("displayName", "==", username.trim().toLocaleLowerCase())
            .get()
            .then((users) => {
              if (users.docs.length > 0) {
                setLoading(false);
                setUsernameError("the username is already taken by someone!");
                return;
              } else {
                setUsernameError("");
              }
            });
        })
        .then(() => {
          // No errors create an account with username and password

          firebase.auth
            .createUserWithEmailAndPassword(
              email.trim().toLocaleLowerCase(),
              password
            )
            .then((authUser) => {
              const { isNewUser } = authUser.additionalUserInfo;
              authUser.user
                .updateProfile({
                  displayName: username.trim().toLowerCase(),
                })
                .then(() => {
                  const { displayName, email, photoURL, uid } = authUser?.user;
                  firebase.db
                    .collection("users")
                    .doc(uid)
                    .set({
                      displayName: displayName.trim().toLocaleLowerCase(),
                      email: email.trim().toLocaleLowerCase(),
                      photoURL: photoURL,
                      phoneNumber: null,
                      isNewUser: isNewUser,
                    })
                    .finally(() => {
                      setUsernameError("");
                      setUsername("");
                      setEmail("");
                      setPassword("");
                      setConfirmPassword("");
                      setEmailError("");
                      setShowPassword(false);
                      setShowConfPassword(false);
                      setConfPasswordError("");
                      setLoading(false);
                      setCardToMount("login");
                      (async () => {
                        await history.replace(
                          `/additional-information/${uid}/${uuid_v4()}`
                        );
                      })();
                    });
                });
            });
        });
    }
  };

  return (
    <form className="register" onSubmit={createAccount}>
      <h1>Register</h1>
      <Input
        LeftIcon={HiOutlineMail}
        type="email"
        placeholder="email"
        value={email}
        focus={true}
        setValue={setEmail}
        label="email"
        inputError={emailError}
      />
      <Input
        LeftIcon={BsPersonCheck}
        type="text"
        placeholder="username"
        value={username}
        setValue={setUsername}
        label="username"
        inputError={usernameError}
      />
      <Input
        LeftIcon={CgLock}
        type="password"
        placeholder="password"
        inputRef={passwordRef}
        value={password}
        setValue={setPassword}
        label="password"
        RightIcon={!showPassword ? IoMdEyeOff : IoMdEye}
        rightIconTitle={!showPassword ? "show password" : "hide password"}
        changeInputType={setShowPassword}
        inputError={passwordMessage}
      />
      <Input
        LeftIcon={CgLock}
        type="password"
        placeholder="confirm password"
        inputRef={confirmPasswordRef}
        value={confirmPassword}
        setValue={setConfirmPassword}
        label="confirm password"
        RightIcon={!showConfPassword ? IoMdEyeOff : IoMdEye}
        rightIconTitle={!showConfPassword ? "show password" : "hide password"}
        changeInputType={setShowConfPassword}
        inputError={confPasswordError}
      />
      <button type="submit" onClick={createAccount}>
        REGISTER {loading && <ActivityIndicator size={15} />}
      </button>
      <div className="register__bottom">
        <p>Already have an account?</p>
        <button onClick={() => setCardToMount("login")}>LOGIN</button>
      </div>
    </form>
  );
};

export default Register;
