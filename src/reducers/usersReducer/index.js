
import constants from "../../utils";

const users = (state = [], action) => {
  switch (action.type) {
    case constants.SET_USERS:
      return (state = action.value);
    default:
      return state;
  }
};

export default users;
