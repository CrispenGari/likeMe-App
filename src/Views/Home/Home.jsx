import React from "react";
import "./Home.css";
import { Header, Posts, Form, MoreInfo } from "../../Components";

import { IoIosCreate } from "react-icons/io";
import { IconButton } from "@material-ui/core";
const Home = () => {
  const [showForm, setShowForm] = React.useState(false);

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
      <div className="home__newuser">
        <MoreInfo />
      </div>
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
