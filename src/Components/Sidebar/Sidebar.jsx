import React from "react";
import "./Sidebar.css";
import { Person } from "../../Components";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  return (
    <div className="sidebar">
      <h1>People</h1>
      <div className="sidebar__users">
        {/* We don't want to display the current user on people suggestions */}
        {users
          ?.filter((user_) => user?.uid !== user_?.data.uid)
          .map((user) => {
            return <Person key={user?.id} user={user} />;
          })}
      </div>
    </div>
  );
};

export default Sidebar;
