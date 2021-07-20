import React from "react";
import "./Comment.css";
import { Avatar, IconButton } from "@material-ui/core";
import { HiBadgeCheck } from "react-icons/hi";
import { Delete } from "@material-ui/icons";
import firebase from "../../backend";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
const Comment = ({ comment, postId }) => {
  const [liked, setLiked] = React.useState(false);
  return (
    <div className="comment">
      <div className="comment__top">
        <Avatar className="comment__avatar" />
        <div>
          <p>
            <span className="comment__username">@username</span>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              nihil.
            </span>
          </p>
          <div className="comment__controls">
            <div className="comment__controls__right">
              <time>3 days ago</time>
              {liked ? (
                <IconButton title="react">
                  <Favorite className="comment__icon__like" />
                </IconButton>
              ) : (
                <IconButton title="react">
                  <FavoriteBorder className="comment__icon" />
                </IconButton>
              )}
              <IconButton title="react">
                <Delete className="comment__icon" />
              </IconButton>
            </div>
            <p>
              <span>0</span>
              <Favorite className="comment__icon__like" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
