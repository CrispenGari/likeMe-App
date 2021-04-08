import React from "react";
import "./People.css";
import { Header } from "../../Components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Person } from "../../Components";
const People = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  document.title = `LikeMe • ${pathname.split(/\//)[1]}`;

  return (
    <div className="people">
      <div className="people__header">
        <Header />
      </div>
      <div className="people__main">
        <div className="people__container">
          <div
            className="
                "
          >
            <h1>People</h1>
            {/* <div className="people__search">
              <input type="text" placeholder="Search people..." />
              <Search />
            </div> */}
          </div>
          <div className="people__list">
            {/* We don't want to display the current user on people suggestions */}

            {users
              ?.filter((user_) => user?.uid !== user_?.data.uid)
              .map((user) => {
                return <Person key={user?.id} user={user} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
