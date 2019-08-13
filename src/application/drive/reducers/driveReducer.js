import {initialState} from "../state/moduleState";
import {RECEIVED_ROOT_FOLDER_DATA} from "../actions/getRootFolder";


export const driveReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_ROOT_FOLDER_DATA :
            return Object.assign({},state,{rootFolder : action.folder});
        default :
            return state;
    }
};