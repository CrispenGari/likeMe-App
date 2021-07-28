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
import followers from "./followersReducer";
import followings from "./followingsReducer";
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
  followers,
  followings,
});

export default rootReducers;
