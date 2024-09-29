import { Action } from "../../interfaces";

const initialState = false;

export default function sidebarReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return !state;
        default:
            return state;
    }
}