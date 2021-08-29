import { ActionType } from "../../types";
import constants from "../../utils";
const messages = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_MESSAGES:
      return (state = action.value);
    default:
      return state;
  }
};

export default messages;
