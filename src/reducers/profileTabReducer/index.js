import constants from "../../utils";
import { profileTabs } from "../../utils/tabs";

const profileTabReducer = (state = profileTabs.PHOTOS, action) => {
  switch (action.type) {
    case constants.SET_PROFILE_TAB:
      return (state = action.value);
    default:
      return state;
  }
};

export default profileTabReducer;
