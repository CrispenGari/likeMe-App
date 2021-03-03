import constants from "../../utils";

const user = (state = null, action) => {
  switch (action.type) {
    case constants.SET_USER:
      return (state = action.value);
    default:
      return state;
  }
};

export default user;
