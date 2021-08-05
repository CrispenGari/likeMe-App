import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../Components";
import {
  AdminNotification,
  CommentNotification,
  FollowerNotification,
  LikeNotification,
  SuggestionsNotification,
} from "../../Components/Notifications";
import "./Notifications.css";
const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  console.log(notifications);
  return (
    <div className="notifications">
      <div className="notifications__header">
        <Header />
      </div>
      <div className="notifications__main">
        {notifications?.map((notification, index) => {
          switch (notification.type) {
            case "reaction":
              return (
                <LikeNotification key={index} notification={notification} />
              );
            case "comment":
              return (
                <CommentNotification key={index} notification={notification} />
              );
            case "follower":
              return (
                <FollowerNotification key={index} notification={notification} />
              );
            case "admin":
              return (
                <AdminNotification key={index} notification={notification} />
              );
            case "robot":
              return (
                <SuggestionsNotification
                  key={index}
                  notification={notification}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Notifications;
