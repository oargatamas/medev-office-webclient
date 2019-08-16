import {initialState} from "../state/moduleState";
import {RECEIVED_ROOT_FOLDER_DATA} from "../actions/getRootFolder";
import {RECEIVED_FOLDER_CONTENT} from "../actions/getFolderContent";
import {CLOSE_DIALOG, DIALOG_FETCH_START, DIALOG_FETCH_SUCCESS, OPEN_DIALOG} from "../actions/dialogActions";


export const driveReducer = (state = initialState, action) => {
    switch (action.type) {
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
            return Object.assign({}, state, {isItemDialogOpen: true, itemDialogContentType: action.contentType});
        case CLOSE_DIALOG:
            return Object.assign({}, state, {isItemDialogOpen: false});
        default :
            return state;
    }
};