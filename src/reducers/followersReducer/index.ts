import { ActionType } from "../../types";
import constants from "../../utils";
const followersReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_FOLLOWERS:
      return (state = action.value);
    default:
      return state;
  }
};
export default followersReducer;
