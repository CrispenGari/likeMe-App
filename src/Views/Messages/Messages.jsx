import React, { useState } from "react";
import "./Messages.css";
import { Header, User, Fleets } from "../../Components";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const Messages = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const [deleteNotification, setDeleteNotification] = useState(false);
  const fleets = useSelector((state) => state.fleets);
  const { pathname } = useLocation();
  document.title = `LikeMe • ${pathname.split(/\//)[1]}`;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteNotification(false);
  };
  return (
    <div className="messages">
      <div className="messages__header">
        <Header />
      </div>
      <div className="messages__fleets">
        <Fleets setDeleteNotification={setDeleteNotification} />
      </div>
      <div className="messages__main">
        <div className="messages__container">
          <div className="messages__container__header">
            <h1>Messages</h1>
          </div>
          <div className="messages__chats">
            {users?.map(
              (user_, i) =>
                user_?.data.uid !== user?.uid && (
                  <User key={i} user={user_} fleets={fleets} />
                )
            )}
          </div>
        </div>
      </div>
      <Snackbar
        open={deleteNotification}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Your <strong>Fleet</strong> was <strong>Deleted</strong>!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Messages;
