import { combineReducers } from "redux";
import messages from "./messagesReducer";
import posts from "./postsReducer";
import user from "./userReducer";
import hashTags from "./hashTagsReducer";
import users from "./usersReducer";
import fleets from "./fleetsReducer";

const rootReducers = combineReducers({
  messages,
  posts,
  user,
  hashTags,
  users,
  fleets,
});

export default rootReducers;
