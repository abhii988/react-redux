import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";

const allReducers = combineReducers({
  totalItems: itemReducer,
});

export default allReducers;
