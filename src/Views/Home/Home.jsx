import React, { useEffect, useState } from "react";
import "./Home.css";
import { Header, Posts, Form } from "../../Components";
import firebase from "../../backend";
import actions from "../../actions";
import { useDispatch } from "react-redux";
import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
const Home = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
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
      {showForm && <Form setShowForm={setShowForm} />}
      <Posts />
      <IconButton
        className="home__create__post"
        title="new post"
        onClick={() => setShowForm(true)}
      >
        <IoIosCreate className="home__create__post__icon" />
      </IconButton>
    </div>
  );
};

export default Home;
