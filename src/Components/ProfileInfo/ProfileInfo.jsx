import "./ProfileInfo.css";
import React from "react";
import ProfileInfoItem from "../ProfileInfoItem/ProfileInfoItem";
import {
  GiThreeFriends,
  GiLovers,
  GiFlowerPot,
  GiCottonFlower,
} from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { BsArrowsExpand } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import { FaPeopleCarry } from "react-icons/fa";

const ProfileInfo = () => {
  return (
    <div className="profile__info">
      <p>
        To edit this go to your{" "}
        <span className="span__global__clickable">settings</span>.
      </p>
      <div className="profile__info__cards">
        <ProfileInfoItem Icon={GiThreeFriends} title="friends" value={10} />
        <ProfileInfoItem Icon={GiFlowerPot} title="birthday" value={10} />
        <ProfileInfoItem Icon={GiCottonFlower} title="yob" value={2000} />
        <ProfileInfoItem
          Icon={FaPeopleCarry}
          title="best friend"
          value={"@username"}
        />
        <ProfileInfoItem Icon={BsArrowsExpand} title="gender" value={"male"} />
        <ProfileInfoItem
          Icon={BiCurrentLocation}
          title="current location"
          value={"unknown"}
        />
        <ProfileInfoItem
          Icon={GiLovers}
          title="relationship status"
          value={"single"}
        />
        <ProfileInfoItem
          Icon={IoIosPeople}
          title="mutual friends"
          value={100}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
