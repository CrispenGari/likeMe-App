import React, { useState, useEffect } from "react";
import "./Home.css";
import { Header, Posts, Form, MoreInfo } from "../../Components";
import { ActivityIndicator } from "../../Components/Common";

import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import firebase from "../../backend";
import { useSelector } from "react-redux";

const Home = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const fbUser = firebase.auth.currentUser;
  const currentUser = useSelector((state) =>
    state.users?.find((__user) => __user?.id === fbUser?.uid)
  );
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  React.useLayoutEffect(() => {
    document.title = "LikeMe • Home • posts";
  }, []);

  React.useEffect(() => {
    return () => {
      setShowForm(false);
    };
  }, []);
  return (
    <div className="home">
      {loading ? (
        <div className="home__newuser">
          <ActivityIndicator size={20} />
        </div>
      ) : null}
      {currentUser?.isNewUser ? (
        <div className="home__newuser">
          <MoreInfo />
        </div>
      ) : null}
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
      {/* <SidebarRight />
      <Sidebar /> */}
    </div>
  );
};

export default Home;
