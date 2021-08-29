import React from "react";
import "./Profile.css";
import { Header } from "../../Components";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import ProfileBanner from "../../Components/ProfileBanner/ProfileBanner";
import ProfileStats from "../../Components/ProfileStats/ProfileStats";
import ProfileButtons from "../../Components/ProfileButtons/ProfileButtons";
import ProfileInfo from "../../Components/ProfileInfo/ProfileInfo";
import EditProfile from "../../Components/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { uid } = useParams();

  const user = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = React.useState(false);
  React.useLayoutEffect(() => {
    document.title = `likeme • profile `;
  }, []);

  return (
    <div className="profile__view">
      <div className="profile__view__header">
        <Header />
      </div>

      <div className="profile__view__main">
        <ProfileBanner />
        <ProfileStats />
        {user?.uid === uid ? (
          <div className="profile__view__main__button">
            <button onClick={() => setEditProfile((prev) => !prev)}>
              {editProfile ? "cancel" : "edit profile"}
            </button>
          </div>
        ) : (
          <ProfileButtons />
        )}
        {editProfile ? <EditProfile setEditProfile={setEditProfile} /> : null}
        <ProfilePosts />
        <ProfileInfo />
      </div>
    </div>
  );
};

export default Profile;
