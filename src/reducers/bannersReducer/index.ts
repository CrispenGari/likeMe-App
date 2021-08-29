import { ActionType } from "../../types";
import constants from "../../utils";

const bannersReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_BANNERS:
      return (state = action.value);
    default:
      return state;
  }
};
export default bannersReducer;
