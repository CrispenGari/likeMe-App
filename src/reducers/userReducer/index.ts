import { ActionType } from "../../types";
import constants from "../../utils";

const user = (state = null, action: ActionType) => {
  switch (action.type) {
    case constants.SET_USER:
      return (state = action.value);
    default:
      return state;
  }
};

export default user;
