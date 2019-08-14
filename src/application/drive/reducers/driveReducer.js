import {initialState} from "../state/moduleState";
import {RECEIVED_ROOT_FOLDER_DATA} from "../actions/getRootFolder";
import {RECEIVED_FOLDER_CONTENT} from "../actions/getFolderContent";


export const driveReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_ROOT_FOLDER_DATA :
            return Object.assign({},state,{rootFolder : action.folder});
        case RECEIVED_FOLDER_CONTENT:
            return Object.assign({},state,{currentFolderItems : action.content});
        default :
            return state;
    }
};