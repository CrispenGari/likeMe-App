import "./HeaderRight.css";
import HeaderRightItem from "../HeaderRightItem/HeaderRightItem";
import { IoIosPeople, IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";
const HeaderRight = () => {
  return (
    <div className="header__right">
      <HeaderRightItem withUser subTitle="open your profile" />
      <HeaderRightItem
        title="chats"
        Icon={RiChatSmile3Line}
        subTitle="open your chats"
        content={3}
      />
      <HeaderRightItem
        title="friends"
        Icon={IoIosPeople}
        subTitle="discover new friends"
        content={9}
      />
      <HeaderRightItem
        title="notifications"
        Icon={IoMdNotificationsOutline}
        subTitle="new notifications"
        content={1}
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
