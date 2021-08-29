import { ActionType } from "../../types";
import constants from "../../utils";

const users = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_USERS:
      return (state = action.value);
    default:
      return state;
  }
};

export default users;
