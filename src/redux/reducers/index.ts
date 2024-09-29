import { combineReducers } from "redux";
import loginReducer from "./login";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
    login: loginReducer,
    sidebar: sidebarReducer,
});
export default rootReducer;
