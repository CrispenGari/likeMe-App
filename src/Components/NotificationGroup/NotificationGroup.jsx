import React from "react";
import {
  SuggestionsNotification,
  FollowerNotification,
  LikeNotification,
  CommentNotification,
  AdminNotification,
} from "../Notifications";
import "./NotificationGroup.css";
const NotificationGroup = ({ notifications, title }) => {
  if (notifications?.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="notifications__main__breaker">
        <div />
        <h1>{title}</h1>
        <div />
      </div>
      {notifications?.map((notification, index) => {
        switch (notification.type) {
          case "reaction":
            return <LikeNotification key={index} notification={notification} />;
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
  );
};

export default NotificationGroup;
