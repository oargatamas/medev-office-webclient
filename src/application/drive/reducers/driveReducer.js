import {initialState} from "../state/moduleState";
import {RECEIVED_ROOT_FOLDER_DATA} from "../actions/getRootFolder";
import {RECEIVED_FOLDER_CONTENT} from "../actions/getFolderContent";
import {CLOSE_DIALOG, DIALOG_FETCH_START, DIALOG_FETCH_SUCCESS, OPEN_DIALOG} from "../actions/dialogActions";
import {FETCH_PERMISSIONS_SUCCESS} from "../actions/fetchPermissionActions";
import {driveItemQueueReducer} from "./itemQueueReducer";
import {combineReducers} from "redux";
import {RECEIVED_FOLDER_TREE} from "../actions/moveFileToFolder";


export const driveBaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_SUCCESS:
            return Object.assign({}, state, {permissionTypes: action.enumeration});
        case RECEIVED_FOLDER_TREE:
            return Object.assign({},state, {folderTree: action.tree});
        case RECEIVED_ROOT_FOLDER_DATA :
            return Object.assign({}, state, {rootFolder: action.folder, currentFolderItems: action.content});
        case RECEIVED_FOLDER_CONTENT :
            return Object.assign({}, state, {
                rootFolder: action.rootFolder,
                currentFolderItems: action.content,
                breadCrumbs: action.parents
            });
        case DIALOG_FETCH_START:
            return Object.assign({}, state, {isItemDialogFetching: true});
        case DIALOG_FETCH_SUCCESS:
            return Object.assign({}, state, {isItemDialogFetching: false});
        case OPEN_DIALOG :
            return Object.assign({}, state, {
                isItemDialogOpen: true,
                itemDialogContentType: action.contentType,
                currentDialogItem: action.item
            });
        case CLOSE_DIALOG:
            return Object.assign({}, state, {isItemDialogOpen: false});
        default :
            return state;
    }
};


export const driveReducer = combineReducers({
    drive : driveBaseReducer,
    uploadQueue : driveItemQueueReducer,
});