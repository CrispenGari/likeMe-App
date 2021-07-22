import constants from "../utils";

const setUser = (value) => {
  return {
    type: constants.SET_USER,
    value: value,
  };
};
const setUsers = (value) => {
  return {
    type: constants.SET_USERS,
    value: value,
  };
};
const setFleets = (value) => {
  return {
    type: constants.SET_FLEETS,
    value: value,
  };
};
const setLikes = (value) => {
  return {
    type: constants.SET_LIKES,
    value: value,
  };
};
const setMessages = (value) => {
  return {
    type: constants.SET_MESSAGES,
    value: value,
  };
};
const setPosts = (value) => {
  return {
    type: constants.SET_POSTS,
    value: value,
  };
};
const setHashTags = (value) => {
  return {
    type: constants.SET_HASH_TAGS,
    value: value,
  };
};
const setBanners = (value) => {
  return {
    type: constants.SET_BANNERS,
    value: value,
  };
};
const setProfileTab = (value) => {
  return {
    type: constants.SET_PROFILE_TAB,
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
};

export default actions;
