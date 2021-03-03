import constants from "../utils";

const setUser = (value) => {
  return {
    type: constants.SET_USER,
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

const actions = {
  setUser,
  setMessages,
  setPosts,
  setHashTags,
  setLikes,
};

export default actions;
