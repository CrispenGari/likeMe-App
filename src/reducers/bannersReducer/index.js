import constants from "../../utils";

const bannersReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_BANNERS:
      return (state = action.payload);
    default:
      return state;
  }
};
export default bannersReducer;
