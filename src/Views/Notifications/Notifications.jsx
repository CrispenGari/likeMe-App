import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../Components";
import { IoMdNotificationsOff } from "react-icons/io";

import helperFunctions from "../../utils/helperfunctions";
import "./Notifications.css";
import NotificationGroup from "../../Components/NotificationGroup/NotificationGroup";
const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  const latestNotifications = notifications?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days === 0;
  });
  const yesterdayNotifications = notifications?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days === 1;
  });
  const thisWeekNotifications = notifications?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return (
      timeObject.days <= 7 && timeObject.days !== 0 && timeObject.days !== 1
    );
  });
  const otherNotifications = notifications?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days > 7;
  });

  return (
    <div className="notifications">
      <div className="notifications__header">
        <Header />
      </div>
      {notifications?.length === 0 ? (
        <div className="notification__main__no_notifications">
          <div>
            <IoMdNotificationsOff className="notification__main__no__notifications__icon" />
            <p>you don't have any notifications!</p>
          </div>
        </div>
      ) : (
        <div className="notifications__main">
          <NotificationGroup
            title={"today"}
            notifications={latestNotifications}
          />
          <NotificationGroup
            title={"yesterday"}
            notifications={yesterdayNotifications}
          />
          <NotificationGroup
            title={"this week"}
            notifications={thisWeekNotifications}
          />
          <NotificationGroup title={"old"} notifications={otherNotifications} />
        </div>
      )}
    </div>
  );
};

export default Notifications;
