import constants from "../utils";

const setUser = (value: any) => {
  return {
    type: constants.SET_USER,
    value: value,
  };
};
const setUsers = (value: any) => {
  return {
    type: constants.SET_USERS,
    value: value,
  };
};
const setFleets = (value: any) => {
  return {
    type: constants.SET_FLEETS,
    value: value,
  };
};
const setLikes = (value: any) => {
  return {
    type: constants.SET_LIKES,
    value: value,
  };
};
const setMessages = (value: any) => {
  return {
    type: constants.SET_MESSAGES,
    value: value,
  };
};
const setPosts = (value: any) => {
  return {
    type: constants.SET_POSTS,
    value: value,
  };
};
const setHashTags = (value: any) => {
  return {
    type: constants.SET_HASH_TAGS,
    value: value,
  };
};
const setBanners = (value: any) => {
  return {
    type: constants.SET_BANNERS,
    value: value,
  };
};
const setProfileTab = (value: any) => {
  return {
    type: constants.SET_PROFILE_TAB,
    value: value,
  };
};
const setProfiles = (value: any) => {
  return {
    type: constants.SET_PROFILES,
    value: value,
  };
};
const setFollowings = (value: any) => {
  return {
    type: constants.SET_FOLLOWINGS,
    value: value,
  };
};
const setFollowers = (value: any) => {
  return {
    type: constants.SET_FOLLOWERS,
    value: value,
  };
};
const setNotifications = (value: any) => {
  return {
    type: constants.SET_NOTIFICATIONS,
    value: value,
  };
};

const actions = {
  setUser,
  setUsers,
  setMessages,
  setPosts,
  setHashTags,
  setLikes,
  setFleets,
  setBanners,
  setProfileTab,
  setProfiles,
  setFollowings,
  setFollowers,
  setNotifications,
};

export default actions;
