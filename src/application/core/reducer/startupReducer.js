import {initialState} from "../state/startUpState";
import {CHANGE_STARTUP_TEXT, INIT_STARTUP, START_UP_ERROR, START_UP_FINISHED} from "../action/startupActions";


export const startupReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_STARTUP :
            return Object.assign({}, state, {isFinished: false, errorObject: null});
        case START_UP_FINISHED :
            return Object.assign({}, state, {IsFinished: true});
        case START_UP_ERROR :
            return Object.assign({}, state, {errorObject: action.error});
        case CHANGE_STARTUP_TEXT :
            return Object.assign({}, state, {currentTask: action.text});
        default :
            return state;
    }
};