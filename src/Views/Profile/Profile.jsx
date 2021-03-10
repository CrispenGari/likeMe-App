import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Header, Post } from "../../Components";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "../../backend";
import { AlertTitle, Alert } from "@material-ui/lab";
const Profile = () => {
  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [allowEdit, setAllowEdit] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("Single");
  const [alert, setAlert] = useState(false);

  const updateProfile = () => {
    firebase.db
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        firebase.db
          .collection("users")
          .doc(snapshot.docs[0]?.id)
          .update({
            phoneNumber: phone && phone,
            gender: gender && gender,
            status: status && status,
            bio: bio && bio,
          });
        discard();
        setAlert(!false);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };
  const discard = () => {
    setGender("Male");
    setPhone("");
    setBio("");
    setStatus("Single");
    setAllowEdit(false);
  };
  useEffect(() => {
    const currU = users?.filter((user) => user?.data?.uid === uid);
    setCurrentUser(currU[0]);
  }, [uid, users]);

  useEffect(() => {
    const currUposts = posts?.filter((post) => post?.data?.userId === uid);
    setCurrentUserPosts(currUposts);
  }, [uid, posts]);

  const followUser = () => {
    firebase.db
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        firebase.db
          .collection("users")
          .doc(snapshot.docs[0]?.id)
          .collection("followers")
          .add({
            displayName: user?.displayName,
            email: user?.email,
            emailVerified: user?.emailVerified,
            phoneNumber: user?.phoneNumber,
            photoURL: user?.photoURL,
            uid: user?.uid,
          });
      });
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <Header />
      </div>
      <div className="profile__main">
        <div className="profile__container">
          {alert && (
            <Alert severity="success">
              <AlertTitle>{user?.displayName.split(/\s/)[0]}</AlertTitle>
              Your profile was — <strong>Updated</strong>
            </Alert>
          )}
          <div className="profile__main">
            <h1>
              {currentUser?.data?.displayName}{" "}
              {uid === user?.uid ? (
                <button
                  onClick={() => {
                    history.push("/");
                    firebase.auth.signOut();
                  }}
                >
                  Logout
                </button>
              ) : (
                <p></p>
              )}
            </h1>
            <div className="profile__barner">
              <h2>LikeMe</h2>
              <label htmlFor="profile__background__banner">
                <input
                  type="file"
                  accept="images/*"
                  id="profile__background__banner"
                  style={{ display: "none" }}
                />
                {uid === user?.uid && <button>Edit</button>}
              </label>
            </div>
            <div className="profile__basics">
              <Avatar
                className="profile__basics__avatar"
                src={currentUser?.data?.photoURL}
                alt={currentUser?.data?.displayName}
              />
              <div className="profile__basics__right">
                <div className="profile__basics__left">
                  <h1>{currentUser?.data?.displayName}</h1>
                  <small>{currentUser?.data?.bio || "No Bio"}</small>
                  <img src={currentUser?.data?.photoURL} alt="view-profile" />
                  <small>
                    <span>{currentUser?.data?.gender || "Not Specified"}</span>{" "}
                    •{" "}
                    <span>{currentUser?.data?.status || "Not Specified"}</span>
                  </small>
                </div>
                <div className="profile__basics__right__info">
                  {uid === user?.uid ? (
                    <>
                      <button onClick={() => setAllowEdit(!allowEdit)}>{`${
                        allowEdit ? "Disable Edit" : "Enable Edit"
                      }`}</button>
                      <input
                        type="text"
                        placeholder="Bio"
                        disabled={!allowEdit}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        disabled={!allowEdit}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <select
                        className="profile__select"
                        disabled={!allowEdit}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {[
                          "Single",
                          "In Relationship",
                          "Complicated",
                          "Searching",
                        ].map((status, index) => {
                          return (
                            <option
                              value={status.toLocaleLowerCase()}
                              key={index}
                            >
                              {status}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        className="profile__select"
                        disabled={!allowEdit}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        {["Male", "Female", "Trans-gender"].map(
                          (status, index) => {
                            return (
                              <option
                                value={status.toLocaleLowerCase()}
                                key={index}
                              >
                                {status}
                              </option>
                            );
                          }
                        )}
                      </select>
                      <div className="profile__edits__controls">
                        <button onClick={updateProfile} disabled={!allowEdit}>
                          Save
                        </button>
                        <button onClick={discard}>Discard</button>
                      </div>
                      <div className="profile__bottom__followers">
                        <small>{`2 • Followings | 3 • Followers`}</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <button onClick={followUser}>Follow</button>
                      <div className="profile__bottom__followers">
                        <small>{`2 • Followings | 3 • Followers`}</small>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="post__more">
              <small>
                <span>Email</span> <span>{currentUser?.data?.email}</span>
              </small>

              <small>
                <span>Phone Number</span>{" "}
                <span>{currentUser?.data?.phoneNumber || "No Given"}</span>
              </small>

              <small>
                <span>Joined at</span>{" "}
                <span>{currentUser?.data?.creationTime}</span>
              </small>
              <small>
                <span>Last Seen</span>{" "}
                <span>{currentUser?.data?.lastSignInTime}</span>{" "}
              </small>
            </div>
          </div>

          <h1>Posts</h1>
          <div className="profile__posts">
            {currentUserPosts?.map((post) => {
              return <Post key={post?.id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
