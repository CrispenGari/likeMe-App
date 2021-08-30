import constants from "../../utils";

const bannersReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_BANNERS:
      return (state = action.value);
    default:
      return state;
  }
};
export default bannersReducer;
