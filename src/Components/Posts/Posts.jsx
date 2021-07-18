import React, { useState } from "react";
import "./Posts.css";
import { Post, Fleets } from "../../Components";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import FleetPreview from "../FleetPreview/FleetPreview";
import useFleetFetch from "../../hooks/useFleetFetch";
import { useEffect } from "react";
const Posts = () => {
  useFleetFetch();
  const posts = useSelector((state) => state.posts);
  const [fleetImage, setFleetImage] = useState(null);
  const [showNotification, setShowNotification] = useState(!true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };
  useEffect(() => setFleetImage(null), []);
  return (
    <>
      <div className="posts">
        <Fleets setFleetImage={setFleetImage} />
        {fleetImage ? (
          <FleetPreview
            image={fleetImage}
            setFleetImage={setFleetImage}
            fleetImage={fleetImage}
          />
        ) : null}

        {posts.map((post, i) => {
          if ((i + 1) % 5 === 0) {
            return (
              <>
                <Fleets
                  setFleetImage={setFleetImage}
                  title="Have you seen this?"
                />
                <Post
                  key={post?.id}
                  post={post}
                  setShowNotification={setShowNotification}
                />
              </>
            );
          } else {
            return (
              <Post
                key={post?.id}
                post={post}
                setShowNotification={setShowNotification}
              />
            );
          }
        })}
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
