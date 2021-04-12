import React from "react";
import { Like } from "../../Components";

import "./Likes.css";
const Likes = ({ setOpenLike, likes }) => {
  console.log(likes[0]);
  return (
    <div className="likes">
      <h1>
        All Likes <button onClick={() => setOpenLike(false)}>Hide Likes</button>
      </h1>
      <div
        className={`likes__container ${
          likes?.length === 0 && "likes__container--nolikes"
        }`}
      >
        {likes.map((like, i) => {
          return <Like key={i} like={like} />;
        })}
        {likes?.length === 0 && <h1>No likes for this Post.</h1>}
      </div>
    </div>
  );
};

export default Likes;
