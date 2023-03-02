import { combineReducers } from "redux";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
});

export default rootReducer;
