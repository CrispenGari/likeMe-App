import "./SampleComments.css";

import React from "react";

const renderUsers = (usersNames) => {
  const users = usersNames?.slice(0, 3);

  if (usersNames.length > 3) {
    return (
      <div>
        {users?.map((user, index) => {
          if (index === 0) {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter">, </span>
              </>
            );
          } else if (index === 1) {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter">, </span>
              </>
            );
          } else {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter"> and </span>
                <span className="username" index={index}>
                  {usersNames?.length - 3} others
                </span>
              </>
            );
          }
        })}
      </div>
    );
  }
  if (usersNames.length === 3) {
    return (
      <div>
        {users?.map((user, index) => {
          if (index === 0) {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter">, </span>
              </>
            );
          } else if (index === 1) {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter"> and </span>
              </>
            );
          } else {
            return (
              <span className="username" index={index}>
                {user}
              </span>
            );
          }
        })}
      </div>
    );
  }
  if (usersNames.length === 2) {
    return (
      <div>
        {users?.map((user, index) => {
          if (index === 0) {
            return (
              <>
                <span className="username" index={index}>
                  {user}
                </span>
                <span className="delimeter"> and </span>
              </>
            );
          } else {
            return (
              <span className="username" index={index}>
                {user + " "}
              </span>
            );
          }
        })}
      </div>
    );
  }
  if (usersNames.length === 1) {
    return <span className="username">{users[0] + " "}</span>;
  }
};
const SampleComments = ({ comments, setOpenComments }) => {
  const usersNames = Array.from(
    new Set(comments?.map((comment) => comment?.displayName))
  );

  return (
    <div className="sample__comments">
      <div>
        {renderUsers(usersNames)}
        <span className="sample__comments__message">
          commented on this post
        </span>
      </div>
      <h1 onClick={() => setOpenComments(true)}>Read comments</h1>
    </div>
  );
};

export default SampleComments;
