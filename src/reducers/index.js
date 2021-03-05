import { combineReducers } from "redux";
import messages from "./messagesReducer";
import posts from "./postsReducer";
import user from "./userReducer";
import hashTags from "./hashTagsReducer";
import users from "./usersReducer";

const rootReducers = combineReducers({
  messages,
  posts,
  user,
  hashTags,
  users,
});

export default rootReducers;
