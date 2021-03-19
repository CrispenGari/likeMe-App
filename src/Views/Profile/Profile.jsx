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
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);

  const deleteAccount = () => {
    // Delete the user in the collection users
    firebase.db
      .collection("users")
      .where("uid", "==", user?.uid)
      .get()
      .then((snapshot) => {
        firebase.db.collection("users").doc(snapshot.docs[0]?.id).delete();
      })
      .then(() => {
        // Delete their posts as well
        firebase.db
          .collection("posts")
          .where("userId", "==", uid)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              firebase.db.collection("posts").doc(doc?.id).delete();
            });
          })
          .then(() => {
            // Delete all their messages recieved and sent
            firebase.db
              .collection("messages")
              .where("receiver", "==", uid)
              .get()
              .then((snapshot) => {
                // For recieved mess
                snapshot.docs.forEach((doc) => {
                  firebase.storage
                    .ref()
                    .child(
                      `messages/${
                        doc?.data()?.imageMessage.split("%2F")[1]?.split("?")[0]
                      }`
                    )
                    .delete()
                    .then(() => {
                      firebase.db.collection("messages").doc(doc?.id).delete();
                    });
                });
              })
              .then(() => {
                firebase.db
                  .collection("messages")
                  .where("sender", "==", uid)
                  .get()
                  .then((snapshot) => {
                    // For recieved mess
                    snapshot.docs.forEach((doc) => {
                      firebase.storage
                        .ref()
                        .child(
                          `messages/${
                            doc
                              ?.data()
                              ?.imageMessage.split("%2F")[1]
                              ?.split("?")[0]
                          }`
                        )
                        .delete()
                        .then(() => {
                          firebase.db
                            .collection("messages")
                            .doc(doc?.id)
                            .delete();
                        });
                    });
                  });
              });
          })
          .finally(() => {
            // delete the user
            firebase.auth?.currentUser?.delete().then(() => {
              console.log("deleted");
            });
          });
      });
  };
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

  useEffect(() => {
    firebase.db
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        const userDocId = snapshot.docs[0]?.id;
        firebase.db
          .collection("users")
          .doc(userDocId)
          .collection("followers")
          .get()
          .then((snapshot_) => {
            setUserFollowers(
              snapshot_.docs.map((doc) => ({ id: doc?.id, data: doc?.data() }))
            );
          })
          .then(() => {
            firebase.db
              .collection("users")
              .doc(userDocId)
              .collection("followings")
              .get()
              .then((snapshot__) => {
                setUserFollowings(
                  snapshot__.docs.map((doc) => ({
                    id: doc?.id,
                    data: doc?.data(),
                  }))
                );
              });
          });
      });
  }, [uid]);

  console.log("Followers", userFollowers);
  console.log("Followings", userFollowings);
  // console.log(user, currentUser?.data?.uid);

  // FOLLOW THE USER IF THE BUTTON IS CLICKED IF YOU ARE NOT FOLLOWING OTHERWISE UN FOLLOW THE USER
  const followUser = (isFollowing) => {
    console.log("isFollowing is: ", isFollowing);
    if (!isFollowing) {
      firebase.db
        .collection("users")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          const userDocId = snapshot.docs[0]?.id;
          // console.log(userDocId);
          firebase.db
            .collection("users")
            .doc(userDocId)
            .collection("followers")
            .where("uid", "==", uid)
            .get()
            .then((followerSnapshot) => {
              firebase?.db
                .collection("users")
                .doc(userDocId)
                .collection("followers")
                .doc(followerSnapshot.docs[0]?.id)
                .delete();
            });
        })
        .then(() => {
          // Add the followed user to your followings
          firebase.db
            .collection("users")
            .where("uid", "==", currentUser?.data?.uid)
            .get()
            .then((snapshot) => {
              const userDocId_ = snapshot.docs[0]?.id;
              firebase.db
                .collection("users")
                .doc(userDocId_)
                .collection("followings")
                .where("uid", "==", currentUser?.data?.uid)
                .get()
                .then((followingSnapshot) => {
                  firebase.db
                    .collection("users")
                    .doc(userDocId_)
                    .collection("followings")
                    .doc(followingSnapshot.docs[0].id)
                    .delete();
                });
            });
        });
    } else {
      firebase.db
        .collection("users")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          const userDocId = snapshot.docs[0]?.id;
          // console.log(userDocId);
          firebase.db
            .collection("users")
            .doc(userDocId)
            .collection("followers")
            .add({
              displayName: user?.displayName,
              email: user?.email,
              emailVerified: user?.emailVerified,
              phoneNumber: user?.phoneNumber,
              photoURL: user?.photoURL,
              uid: user?.uid,
            });
        })
        .then(() => {
          // Add the followed user to your followings
          firebase.db
            .collection("users")
            .where("uid", "==", currentUser?.data?.uid)
            .get()
            .then((snapshot) => {
              const userDocId_ = snapshot.docs[0]?.id;
              firebase.db
                .collection("users")
                .doc(userDocId_)
                .collection("followings")
                .add({
                  displayName: currentUser?.data?.displayName,
                  email: currentUser?.data?.email,
                  emailVerified: currentUser?.data?.emailVerified,
                  phoneNumber: currentUser?.data?.phoneNumber,
                  photoURL: currentUser?.data?.photoURL,
                  uid: currentUser?.data?.uid,
                });
            });
        });
    }
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
                        <small>{`${userFollowings?.length} • Followings | ${userFollowers?.length} • Followers`}</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        disabled
                        onClick={() =>
                          followUser(
                            userFollowings.filter((user_following) => {
                              return uid === user_following?.data?.uid;
                            }).length === 0
                          )
                        }
                      >
                        {userFollowings.filter((user_following) => {
                          return uid === user_following?.data?.uid;
                        }).length === 0
                          ? "Follow"
                          : "Unfollow"}
                      </button>
                      <div className="profile__bottom__followers">
                        <small>{`${userFollowings?.length} • Followings | ${userFollowers?.length} • Followers`}</small>
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
            <h1>
              Posts{" "}
              {uid === user?.uid ? (
                <button
                  onClick={deleteAccount}
                  style={{
                    width: "fit-content",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  Delete Account
                </button>
              ) : (
                <p></p>
              )}
            </h1>
            <div className="profile__posts">
              {currentUserPosts?.map((post) => {
                return <Post key={post?.id} post={post} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
