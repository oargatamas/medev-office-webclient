import {combineReducers} from "redux";
import {CLOSE_SIDE_DRAWER, OPEN_SIDE_DRAWER} from "../action/sideNavActions";


const coreReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_SIDE_DRAWER :
            return Object.assign({},state,{sideDrawerOpen : true});
        case CLOSE_SIDE_DRAWER :
            return Object.assign({},state,{sideDrawerOpen : false});
        default: return state;
    }
};


export const appReducer = combineReducers({
    coreReducer
});