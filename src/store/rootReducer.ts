import { combineReducers } from "redux";
import nodeSlice from "./common/nodeSlice";

const rootReducer = combineReducers({
  node: nodeSlice,
});

export default rootReducer;
