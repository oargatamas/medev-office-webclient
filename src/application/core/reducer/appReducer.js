import {combineReducers} from "redux";
import {APP_SWITCH, CLOSE_SIDE_DRAWER, OPEN_SIDE_DRAWER} from "../action/sideNavActions";
import {initialState} from "../state/appState";


const coreReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SIDE_DRAWER :
            return Object.assign({},state,{sideDrawerOpen : true});
        case CLOSE_SIDE_DRAWER :
            return Object.assign({},state,{sideDrawerOpen : false});
        case APP_SWITCH :
            return Object.assign({},state, {currentApplication : action.currentApp});
        default: return state;
    }
};


export const appReducer = combineReducers({
    coreReducer
});