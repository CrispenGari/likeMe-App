import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Header, Post } from "../../Components";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "../../backend";
const Profile = () => {
  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [allowEdit, setAllowEdit] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

  useEffect(() => {
    const currU = users?.filter((user) => user?.data?.uid === uid);
    setCurrentUser(currU[0]);
  }, [uid, users]);

  useEffect(() => {
    const currUposts = posts?.filter((post) => post?.data?.userId === uid);
    setCurrentUserPosts(currUposts);
  }, [uid, posts]);

  return (
    <div className="profile">
      <div className="profile__header">
        <Header />
      </div>
      <div className="profile__container">
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
          <div
            className="profile__barner"
            style={{
              backgroundImage: `url("https://www.rasmussen.edu/-/media/images/blogs/school-of-technology/computerprogramminghard_banner.jpg?la=en&hash=1897D131AAF9AA952B206B04C44A4969E9D644D5")`,
            }}
          >
            <button>Edit</button>
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
                  <span>{currentUser?.data?.gender || "Not Specified"}</span> •{" "}
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
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      disabled={!allowEdit}
                    />
                    <select className="profile__select" disabled={!allowEdit}>
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
                    <select className="profile__select" disabled={!allowEdit}>
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
                      <button>Save</button>
                      <button>Discard</button>
                    </div>
                    <div className="profile__bottom__followers">
                      <small>2 • Followings</small>|<small>3 • Followers</small>
                    </div>
                  </>
                ) : (
                  <>
                    <button>Follow</button>
                    <div className="profile__bottom__followers">
                      <small>2 • Followings</small>|<small>3 • Followers</small>
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
  );
};

export default Profile;
