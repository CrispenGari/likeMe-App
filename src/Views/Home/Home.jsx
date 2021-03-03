import React, { useEffect } from "react";
import "./Home.css";
import { Header, Posts, Form } from "../../Components";
import firebase from "../../backend";
import actions from "../../actions";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
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
      <Form />
      <Posts />
    </div>
  );
};

export default Home;
