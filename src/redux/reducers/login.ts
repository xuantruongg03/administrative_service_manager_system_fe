import { Action } from "../../interfaces";

const initialState = true;

// const init = localStorage.getItem(CONSTANTS.STATUS_LOGIN) === "true";

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // localStorage.setItem(CONSTANTS.STATUS_LOGIN, true);
            state = true;
            return state;
        case "LOGOUT":
            state = false;
            return state;
        default:
            return state;
    }
};

export default loginReducer;

