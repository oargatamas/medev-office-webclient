import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {
    defaultDialogErrorActions,
    defaultDialogFetchActions,
    defaultDialogSuccessActions,
    finishItemDialogFetch
} from "./dialogActions";


export const RECEIVED_FOLDER_TREE = "driveFolderTreeReceived";


export const requestFolderTree = () => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/tree",
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot retrieve folder structure."
    };

    const successActions = [
        receivedFolderTree,
        finishItemDialogFetch,
    ];

    return callOfficeApi(params, successActions, defaultDialogErrorActions, defaultDialogFetchActions);
};




export const requestItemMove = (targetItem, destinationFolder) => {
    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/move/" + targetItem.id + "/to/" + destinationFolder.id,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot move '" + targetItem.name + "' to '" + destinationFolder.name + "'.",
        successMsg : "'" + targetItem.name + "' successfully moved to '" + destinationFolder.name + "'."
    };

    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};


export const receivedFolderTree = (serverResponse) => {
    return {
        type : RECEIVED_FOLDER_TREE,
        tree : serverResponse,
    }
};