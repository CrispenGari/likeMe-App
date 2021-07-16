import React, { useState } from "react";
import "./Home.css";
import { Header, Posts, Form } from "../../Components";

import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // document.title = "LikeMe • Home • posts";
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
