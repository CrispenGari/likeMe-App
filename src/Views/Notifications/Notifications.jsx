import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../Components";
import { IoMdNotificationsOutline, IoMdNotificationsOff } from "react-icons/io";

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
  return (
    <div className="notifications">
      <div className="notifications__header">
        <Header />
      </div>
      <div className="notifications__sub__header">
        <h1>Your Notifications</h1>
        <IoMdNotificationsOutline className="notifications__sub__header__icon" />
      </div>

      {notifications?.length > 0 ? (
        <div className="notifications__main">
          {notifications?.map((notification, index) => {
            switch (notification.type) {
              case "reaction":
                return (
                  <LikeNotification key={index} notification={notification} />
                );
              case "comment":
                return (
                  <CommentNotification
                    key={index}
                    notification={notification}
                  />
                );
              case "follower":
                return (
                  <FollowerNotification
                    key={index}
                    notification={notification}
                  />
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
      ) : (
        <div className="notification__main__no_notifications">
          <div>
            <IoMdNotificationsOff className="notification__main__no__notifications__icon" />
            <p>you don't have any notifications!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
