import "./Profile.css";
import { AiFillCamera } from "react-icons/ai";
import { Avatar, IconButton } from "@material-ui/core";
import { useRef, useState } from "react";

const Profile = ({ setCardToMount }) => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [image, setImage] = useState(null);
  const createAccount = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <form className="profile">
      <h1>Create a public profile</h1>
      <div className="profile__avatar__container">
        <Avatar
          className="profile__avatar"
          src={image ? image : null}
          onClick={() => inputRef.current.click()}
        />
        <IconButton
          className="profile__btn"
          onClick={() => inputRef.current.click()}
        >
          <input
            onChange={(e) => setImage(e.target.value)}
            type="file"
            ref={inputRef}
            hidden
            accept="images/*"
            multiple={false}
            onChange={handleChange}
          />
          <AiFillCamera className="profile__btn__icon" />
        </IconButton>
      </div>
      <div className="profile__input">
        <div className="profile__input__field">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
        </div>
        <p>{usernameError}</p>
      </div>
      <div className="profiles__buttons">
        <button type="submit" onClick={createAccount}>
          CREATE ACCOUNT
        </button>
        <button type="submit" onClick={() => setCardToMount("register")}>
          GO BACK
        </button>
      </div>
    </form>
  );
};

export default Profile;
