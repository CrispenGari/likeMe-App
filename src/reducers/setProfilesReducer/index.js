
import constants from "../../utils";

const setProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_PROFILES:
      return (state = action.value);
    default:
      return state;
  }
};
export default setProfilesReducer;
