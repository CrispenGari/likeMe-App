import "./Menu.css";
import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import { useSelector } from "react-redux";
const Menu = ({ setOpen }) => {
  const notifications = useSelector((state) =>
    state.notifications?.filter((notification) => !notification?.viewed)
  );

  return (
    <div className={"menu"}>
      <MenuItem setOpen={setOpen} withUser subTitle="open your profile" />
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
