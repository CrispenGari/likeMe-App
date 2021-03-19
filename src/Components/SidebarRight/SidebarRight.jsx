import React from "react";
import "./SidebarRight.css";
import { User } from "../../Components";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const users = useSelector((state) => state.users);
  const fleets = useSelector((state) => state.fleets);
  const user = useSelector((state) => state.user);

  return (
    <div className="sidebarright">
      <h1>Chats</h1>
      <div className="sidebarright__users">
        {/* We don't want to display the current user on people suggestions */}
        {users
          ?.filter((user_) => user?.uid !== user_?.data.uid)
          .map((user) => {
            return <User key={user?.id} user={user} fleets={fleets} />;
          })}
      </div>
    </div>
  );
};

export default Sidebar;
