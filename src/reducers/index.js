import { combineReducers } from "redux";
import messages from "./messagesReducer";
import posts from "./postsReducer";
import user from "./userReducer";
import hashTags from "./hashTagsReducer";

const rootReducers = combineReducers({
  messages,
  posts,
  user,
  hashTags,
});

export default rootReducers;
