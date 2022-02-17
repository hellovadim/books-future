import { combineReducers } from "redux";
import listReducer from "./listReducer";
import bookReducer from "./bookReducer";

export default combineReducers({
  list: listReducer,
  book: bookReducer,
});
