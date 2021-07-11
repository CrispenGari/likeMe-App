import React, { useState } from "react";
import "./Posts.css";
import { Post, Fleets } from "../../Components";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const [showNotification, setShowNotification] = useState(!true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };
  return (
    <>
      <div className="posts">
        {posts.map((post, i) => (
          <Post key={i} post={post} setShowNotification={setShowNotification} />
        ))}
        <Snackbar
          open={showNotification}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Your post was <strong>Deleted</strong>!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Posts;
