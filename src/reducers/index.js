import { combineReducers } from "redux";
import messages from "./messagesReducer";
import posts from "./postsReducer";
import user from "./userReducer";
import hashTags from "./hashTagsReducer";
import users from "./usersReducer";
import fleets from "./fleetsReducer";
import banners from "./bannersReducer";
import profileTab from "./profileTabReducer";
import profiles from "./setProfilesReducer";
const rootReducers = combineReducers({
  messages,
  posts,
  user,
  hashTags,
  users,
  fleets,
  banners,
  profileTab,
  profiles,
});

export default rootReducers;
