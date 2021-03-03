import constants from "../../utils";
const messages = (state = [], action) => {
  switch (action.type) {
    case constants.SET_MESSAGES:
      return (state = action.value);
    default:
      return state;
  }
};

export default messages;
