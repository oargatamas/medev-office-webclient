import {initialState} from "../state/moduleState";
import {RECEIVED_ROOT_FOLDER_ID} from "../actions/getRootFolder";


export const driveReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_ROOT_FOLDER_ID :
            return Object.assign({},state,{rootFolderId : action.folderId});
        default :
            return state;
    }
};