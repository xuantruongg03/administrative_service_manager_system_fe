import { Action } from "../../interfaces";

const initState = {
    citizen_id: "",
    name: "",
    position: "",
    phone: "",
    start_date: "",
};

export default function editEmployee(state = initState, action: Action) {
    switch (action.type) {
        case "EDIT_EMPLOYEE":
            return {
                ...state,
                ...(action.payload as typeof state),
            };
        default:
            return state;
    }
}
