import "./ProfileStats.css";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFollowers, useFollowings } from "../../hooks";
import helperFunctions from "../../utils/helperfunctions";

const ProfileStats = () => {
  const { uid } = useParams();
  // Fetch followers and followings
  useFollowings(uid);
  useFollowers(uid);
  const followings = useSelector((state) => state.followings);
  const followers = useSelector((state) => state.followers);

  const posts = useSelector((state) => state.posts).filter(
    (post) => post?.userId === uid
  );
  const banners = useSelector((state) => state.banners).filter(
    (banner) => banner?.userId === uid
  );
  const profiles = useSelector((state) => state.profiles)?.filter(
    (profile) => profile?.userId === uid
  );
  const tags = [];

  const displayPost = [...posts, ...banners, ...profiles, ...tags];

  return (
    <div className="profile__stats">
      <div className="profile__stats__item">
        <h1>{helperFunctions.numberFormat(displayPost?.length)}</h1>
        <p>posts</p>
      </div>
      <div className="profile__stats__item">
        <h1>512</h1>
        <p>Likes</p>
      </div>
      <div className="profile__stats__item">
        <h1>{helperFunctions.numberFormat(followers?.length)}</h1>
        <p>Followers</p>
      </div>
      <div className="profile__stats__item">
        <h1>{helperFunctions.numberFormat(followings?.length)}</h1>
        <p>Followings</p>
      </div>
    </div>
  );
};

export default ProfileStats;
