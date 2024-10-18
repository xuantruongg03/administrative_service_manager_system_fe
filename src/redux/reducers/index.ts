import { combineReducers } from "redux";
import loginReducer from "./login";
import sidebarReducer from "./sidebar";
import hovermapReducer from "./hovermap";

const rootReducer = combineReducers({
    login: loginReducer,
    sidebar: sidebarReducer,
    hovermap: hovermapReducer
});
export default rootReducer;
