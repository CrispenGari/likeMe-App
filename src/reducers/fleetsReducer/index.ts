import { ActionType } from "../../types";
import constants from "../../utils";

const fleetsReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_FLEETS:
      return (state = action.value);
    default:
      return state;
  }
};

export default fleetsReducer;
