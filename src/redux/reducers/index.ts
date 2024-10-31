import { combineReducers } from "redux";
import loginReducer from "./login";
import sidebarReducer from "./sidebar";
import hovermapReducer from "./hovermap";
import editEmployeeReducer from "./editEmployee";
const rootReducer = combineReducers({
    login: loginReducer,
    sidebar: sidebarReducer,
    hovermap: hovermapReducer,
    editEmployee: editEmployeeReducer,
});
export default rootReducer;
