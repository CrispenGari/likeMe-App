import React, { useEffect, useState } from "react";
import "./Home.css";
import { Header, Posts, Form, Sidebar } from "../../Components";
import firebase from "../../backend";
import actions from "../../actions";
import { useDispatch } from "react-redux";
import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
const Home = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          actions.setPosts(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
      });
    return () => {
      unsubscribe();
    };
  });
  return (
    <div className="home">
      <Header />
      {showForm && (
        <Form
          setShowNotification={setShowNotification}
          setShowForm={setShowForm}
        />
      )}
      <Posts />
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Your post was <strong>Posted</strong>!
        </Alert>
      </Snackbar>
      <IconButton
        className="home__create__post"
        title="new post"
        onClick={() => setShowForm(true)}
      >
        <IoIosCreate className="home__create__post__icon" />
      </IconButton>
      <Sidebar />
    </div>
  );
};

export default Home;
