import "./Menu.css";
import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import { IoIosPeople, IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
const Menu = ({ setOpen }) => {
  const notifications = useSelector((state) =>
    state.notifications?.filter((notification) => !notification?.viewed)
  );

  return (
    <div className={"menu"}>
      <MenuItem setOpen={setOpen} withUser subTitle="open your profile" />
      <MenuItem
        title="chats"
        Icon={RiChatSmile3Line}
        subTitle="open your chats"
        setOpen={setOpen}
        content={3}
      />
      <MenuItem
        title="friends"
        Icon={IoIosPeople}
        subTitle="discover new friends"
        setOpen={setOpen}
        content={9}
      />
      <MenuItem
        title="notifications"
        Icon={IoMdNotificationsOutline}
        subTitle="open notifications"
        setOpen={setOpen}
        content={notifications?.length}
      />
      <MenuItem
        title="settings"
        Icon={AiOutlineSetting}
        subTitle="open your settings"
        dot
        setOpen={setOpen}
      />
      <MenuItem
        title="sign out"
        Icon={MdPowerSettingsNew}
        subTitle="sign out of the app"
        dot
        setOpen={setOpen}
      />
    </div>
  );
};

export default Menu;
