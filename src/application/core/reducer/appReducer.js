import {combineReducers} from "redux";
import {APP_SWITCH, CLOSE_SIDE_DRAWER, OPEN_SIDE_DRAWER} from "../action/sideNavActions";
import {initialState} from "../state/appState";
import {
    FETCH_API_DATA,
    FETCH_API_ERROR,
    FETCH_API_SUCCESS,
    FETCH_API_SUCCESS_WITH_RESPONSE
} from "../action/apiCallActions";
import {RECEIVED_MODULE_INFO} from "../action/getApplicationActions";
import {startupReducer} from "./startupReducer";
import {driveReducer} from "../../drive/reducers/driveReducer";


const coreReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case OPEN_SIDE_DRAWER :
            return Object.assign({}, state, {sideDrawerOpen: true});
        case CLOSE_SIDE_DRAWER :
            return Object.assign({}, state, {sideDrawerOpen: false});
        case APP_SWITCH :
            return Object.assign({}, state, {currentApplication: action.currentApp});
        case RECEIVED_MODULE_INFO :
            return Object.assign({}, state, {modules: action.modules});
        case FETCH_API_DATA:
            return Object.assign({}, state, {isFetching: true});
        case FETCH_API_SUCCESS :
            return Object.assign({}, state, {isFetching: false, IsAppStartingUp: false, successObject: null, errorObject: null});
        case FETCH_API_SUCCESS_WITH_RESPONSE :
            return Object.assign({}, state, {isFetching: false, IsAppStartingUp: false, successObject: action.response, errorObject: null});
        case FETCH_API_ERROR :
            return Object.assign({}, state, {isFetching: false, IsAppStartingUp: false, successObject: null, errorObject: action.error});
        default:
            return state;
    }
};


export const appReducer = combineReducers({
    coreReducer, startupReducer, driveReducer
});