import { ActionType } from "../../types";
import constants from "../../utils";
const hashTags = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_HASH_TAGS:
      return (state = action.value);
    default:
      return state;
  }
};

export default hashTags;
