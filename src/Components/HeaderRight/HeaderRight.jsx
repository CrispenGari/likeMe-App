import "./HeaderRight.css";
import HeaderRightItem from "../HeaderRightItem/HeaderRightItem";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import { useSelector } from "react-redux";
const HeaderRight = () => {
  const notifications = useSelector((state) =>
    state.notifications?.filter((notification) => !notification?.viewed)
  );
  return (
    <div className="header__right">
      <HeaderRightItem withUser subTitle="open your profile" />
      <HeaderRightItem
        title="notifications"
        Icon={IoMdNotificationsOutline}
        subTitle="new notifications"
        content={notifications?.length}
      />
      <HeaderRightItem
        title="settings"
        Icon={AiOutlineSetting}
        subTitle="open your settings"
        dot
      />
      <HeaderRightItem
        title="sign out"
        Icon={MdPowerSettingsNew}
        subTitle="sign out of the app"
        dot
      />
    </div>
  );
};

export default HeaderRight;
