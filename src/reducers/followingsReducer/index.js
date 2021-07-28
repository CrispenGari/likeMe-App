import constants from "../../utils";
const followingsReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_FOLLOWINGS:
      return (state = action.value);

    default:
      return state;
  }
};

export default followingsReducer;
