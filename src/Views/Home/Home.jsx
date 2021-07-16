import React, { useState } from "react";
import "./Home.css";
import { Header, Posts, Form, Sidebar, SidebarRight } from "../../Components";

import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FleetPreview from "../../Components/FleetPreview/FleetPreview";
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
      <FleetPreview
        image={
          "https://firebasestorage.googleapis.com/v0/b/likeme-a104d.appspot.com/o/profiles%2Fcrispen_dev?alt=media&token=e907aa66-c161-4363-8abd-0b5c7077163a"
        }
      />
      {/* <Posts /> */}
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
