
import constants from "../../utils";

const fleetsReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_FLEETS:
      return (state = action.value);
    default:
      return state;
  }
};

export default fleetsReducer;
