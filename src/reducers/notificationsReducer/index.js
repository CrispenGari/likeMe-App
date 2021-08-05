import constants from "../../utils";
const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_NOTIFICATIONS:
      return (state = action.value);
    default:
      return state;
  }
};

export default notificationsReducer;
