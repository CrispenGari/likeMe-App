import constants from "../../utils";

import { ActionType } from "../../types";
const followingsReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_FOLLOWINGS:
      return (state = action.value);

    default:
      return state;
  }
};

export default followingsReducer;
