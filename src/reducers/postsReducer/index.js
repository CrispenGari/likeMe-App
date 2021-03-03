import constants from "../../utils";
const posts = (state = [], action) => {
  switch (action.type) {
    case constants.SET_POSTS:
      return (state = action.value);
    default:
      return state;
  }
};

export default posts;
