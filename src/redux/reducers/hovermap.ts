import { Action } from "../../interfaces";

const init = ''

const hovermapReducer = (state = init, action: Action) => {
    switch (action.type) {
        case 'SET_HOVERMAP':
            state = action.payload as string
            return state
        case 'RESET_HOVERMAP':
            state = ''
            return state
        default:
            return state
    }
}

export default hovermapReducer
