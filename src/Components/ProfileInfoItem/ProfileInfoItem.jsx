import "./ProfileInfoItem.css";

import React from "react";

const ProfileInfoItem = ({ Icon, title, value }) => {
  return (
    <div className="profile__info__item">
      <div className="profile__info__item__top">
        {Icon ? <Icon className="profile__info__item__icon" /> : null}
        <h1>{title}</h1>
      </div>
      <p>{value}</p>
    </div>
  );
};
export default ProfileInfoItem;
