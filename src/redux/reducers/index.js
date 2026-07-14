import { combineReducers } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  favourites: favouritesReducer,
  search: searchReducer,
});

export default rootReducer;
