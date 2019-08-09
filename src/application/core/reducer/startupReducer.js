import {initialState} from "../state/startUpState";
import {CHANGE_STARTUP_TEXT, START_UP_FINISHED} from "../action/startupActions";


export const startupReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_UP_FINISHED :
            return Object.assign({}, state, {IsFinished: true});
        case CHANGE_STARTUP_TEXT :
            return Object.assign({}, state, {currentTask: action.text});
        default :
            return state;
    }
};