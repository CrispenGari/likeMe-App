import React from "react";
import "./PostOptions.css";
import { useSelector } from "react-redux";
import firebase from "../../backend";

const PostOptions = ({ post, setShowNotification, setAnchorEl }) => {
  const user = useSelector((state) => state.user);
  const deletePost = () => {
    // DELETE A POST FROM A DATABASE AS WELL AS STORAGE
    firebase.db
      .collection("posts")
      .doc(post?.id)
      .delete()
      .then(() =>
        firebase.storage
          .ref()
          .child(
            `images/${
              String(post?.data?.imageURL).split("%2F")[1]?.split("?")[0]
            }`
          )
          .delete()
      )
      .finally(() => {
        setShowNotification(true);
        setAnchorEl(null);
      });
  };

  return (
    <div className="postoptions">
      <button disabled={user?.uid === post?.data?.userId}>Follow</button>
      <button onClick={deletePost} disabled={user?.uid !== post?.data?.userId}>
        Delete
      </button>
      <button disabled={user?.uid === post?.data?.userId}>
        Turn On Notifications
      </button>
      <button disabled={user?.uid === post?.data?.userId}>Mute</button>
      <hr />
      <button>Share</button>
      <button>Download</button>
    </div>
  );
};

export default PostOptions;
