import constants from "../../utils";
const hashTags = (state = [], action) => {
  switch (action.type) {
    case constants.SET_HASH_TAGS:
      return (state = action.value);
    default:
      return state;
  }
};

export default hashTags;
