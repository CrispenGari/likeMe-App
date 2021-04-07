import React, { useState } from "react";
import "./Home.scss";
import { Header, Posts, Form, Sidebar, SidebarRight } from "../../Components";

import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  document.title = "LikeMe • Home • posts";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

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
      <SidebarRight />
      <Sidebar />
    </div>
  );
};

export default Home;
