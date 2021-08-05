import React from "react";
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
  return (
    <div className="notifications">
      <div className="notifications__header">
        <Header />
      </div>
      <div className="notifications__main">
        <AdminNotification />
        <CommentNotification />
        <FollowerNotification />
        <LikeNotification />
        <SuggestionsNotification />
        <AdminNotification />
        <CommentNotification />
        <FollowerNotification />
        <LikeNotification />
        <SuggestionsNotification />
        <AdminNotification />
        <CommentNotification />
        <FollowerNotification />
        <LikeNotification />
        <SuggestionsNotification />
      </div>
    </div>
  );
};

export default Notifications;
