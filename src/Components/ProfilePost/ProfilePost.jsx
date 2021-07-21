import "./ProfilePost.css";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import helperFunctions from "../../utils/helperfunctions";
import Image from "../Image/Image";
const ProfilePost = ({ post }) => {
  const time = helperFunctions.timeString(
    helperFunctions.timestampToTime(post.timestamp)
  );
  const [image, setImage] = useState(null);
  const [openPicture, setOpenPicture] = useState(false);

  return (
    <div className="profile__post">
      <Image
        image={image}
        setImage={setImage}
        open={openPicture}
        setOpen={setOpenPicture}
      />
      <div
        className="profile__post__image__cover"
        onClick={() => {
          setImage({ ...post, picture: "post" });
          setOpenPicture(true);
        }}
      >
        <div className="profile__posts__like">
          <AiFillHeart className="profile__posts__like__icon" />
          <small>4</small>
        </div>
      </div>

      <img loading="lazy" src={post?.imageURL} alt={post?.displayName} />
      <div className="profile__post__date">
        <small>{time}</small>
      </div>
    </div>
  );
};
export default ProfilePost;
