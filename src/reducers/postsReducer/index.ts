import { ActionType } from "../../types";
import constants from "../../utils";
const posts = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_POSTS:
      return (state = action.value);
    default:
      return state;
  }
};

export default posts;
