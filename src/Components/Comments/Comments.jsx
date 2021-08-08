import React from "react";
import "./Comments.css";

import { Modal } from "@material-ui/core";
import Header from "./Header/Header";
import Input from "./Input/Input";
import helperFunctions from "../../utils/helperfunctions";
import CommentsGroup from "../CommentsGroup";
const Comments = ({ post, openComments, setOpenComments, comments }) => {
  const latestComments = comments?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days === 0;
  });
  const yesterdayComments = comments?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days === 1;
  });
  const thisWeekComments = comments?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return (
      timeObject.days <= 7 && timeObject.days !== 0 && timeObject.days !== 1
    );
  });
  const otherComments = comments?.filter((notification) => {
    const timeObject = helperFunctions.timestampToTime(notification?.timestamp);
    return timeObject.days > 7;
  });

  return (
    <Modal
      className="comments"
      open={openComments}
      onClose={() => setOpenComments(false)}
    >
      <div className="comments__container">
        <Header post={post} setOpenComments={setOpenComments} />
        <div className="comments__lists">
          <CommentsGroup post={post} comments={latestComments} title="today" />
          <CommentsGroup
            post={post}
            comments={yesterdayComments}
            title="yesterday"
          />
          <CommentsGroup
            post={post}
            comments={thisWeekComments}
            title="this week"
          />
          <CommentsGroup post={post} comments={otherComments} title="old" />
        </div>
        <Input post={post} />
      </div>
    </Modal>
  );
};

export default Comments;
