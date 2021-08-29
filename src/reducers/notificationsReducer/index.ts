import { ActionType } from "../../types";
import constants from "../../utils";
const notificationsReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_NOTIFICATIONS:
      return (state = action.value);
    default:
      return state;
  }
};

export default notificationsReducer;
