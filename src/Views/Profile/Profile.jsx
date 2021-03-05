import React, { useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Header, Post } from "../../Components";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
const Profile = () => {
  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [allowEdit, setAllowEdit] = useState(false);
  console.log(users);
  return (
    <div className="profile">
      <Header />
      <div className="profile__main">
        <h1>{user?.displayName}</h1>
        <div
          className="profile__barner"
          style={{
            backgroundImage: `url("https://www.rasmussen.edu/-/media/images/blogs/school-of-technology/computerprogramminghard_banner.jpg?la=en&hash=1897D131AAF9AA952B206B04C44A4969E9D644D5")`,
          }}
        >
          <button>Edit</button>
        </div>
        <div className="profile__basics">
          <Avatar className="profile__basics__avatar" />
          <div className="profile__basics__right">
            <div className="profile__basics__left">
              <h1>Username</h1>
              <small>Bio</small>
              <img src={user?.photoURL} alt="view-profile" />
              <small>
                <span>Gender</span> • <span>Status</span>
              </small>
            </div>
            <div className="profile__basics__right__info">
              <button onClick={() => setAllowEdit(!allowEdit)}>{`${
                allowEdit ? "Disable Edit" : "Enable Edit"
              }`}</button>
              <input type="text" placeholder="Bio" disabled={!allowEdit} />
              <input
                type="text"
                placeholder="Phone Number"
                disabled={!allowEdit}
              />
              <select className="profile__select" disabled={!allowEdit}>
                {["Single", "In Relationship", "Complicated", "Searching"].map(
                  (status, index) => {
                    return (
                      <option value={status.toLocaleLowerCase()} key={index}>
                        {status}
                      </option>
                    );
                  }
                )}
              </select>
              <select className="profile__select" disabled={!allowEdit}>
                {["Male", "Female", "Trans-gender"].map((status, index) => {
                  return (
                    <option value={status.toLocaleLowerCase()} key={index}>
                      {status}
                    </option>
                  );
                })}
              </select>
              <div className="profile__edits__controls">
                <button>Save</button>
                <button>Discard</button>
              </div>

              <div className="profile__bottom__followers">
                <small>2 • Followings</small>|<small>3 • Followers</small>
              </div>
            </div>
          </div>
        </div>
        <div className="post__more">
          <small>
            <span>Email</span> <span></span>
          </small>

          <small>
            <span>Phone Number</span> <span></span>
          </small>

          <small>
            <span>Joined at</span> <span></span>
          </small>
          <small>
            <span>Last Seen</span> <span></span>{" "}
          </small>
        </div>
      </div>
      <div className="profile__posts">
        {posts?.map((post) => {
          return <Post key={post?.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
