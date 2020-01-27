import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, encodeUrlData, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, finishItemDialogFetch} from "./dialogActions";
import {UPDATE_QUEUE} from "./itemQueueActions";


export const RECEIVED_FOLDER_TREE = "driveFolderTreeReceived";


export const requestFolderTree = (rootFolder, includeFiles = false) => {
    const query = {
        includeFiles: includeFiles
    };

    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/" + rootFolder.id + "/descendants?" + encodeUrlData(query),
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot retrieve folder structure."
    };

    const successActions = [
        receivedFolderTree,
        finishItemDialogFetch,
    ];

    return callOfficeApi(params, successActions, defaultDialogErrorActions, defaultDialogFetchActions);
};


export const receivedFolderTree = (serverResponse) => {
    return {
        type: RECEIVED_FOLDER_TREE,
        tree: serverResponse,
    }
};


export const enqueueItemsToMove = (items, targetFolder) => {
    let queue = items.map((item) => {
        return {
            ...item,
            destination: {
                id: targetFolder.id,
                name: targetFolder.name,
            },
            fetching: false,
            success: false,
        }
    });

    return {
        type: UPDATE_QUEUE,
        items: queue,
    }
};

export const mapItemToMoveParams = (item) => {
    return {
        method: "POST",
        uri: DRIVE_API_BASE + "/move/" + item.id + "/to/" + item.destination.id,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot move '" + item.name + "' to '" + item.destination.name + "'.",
        successMsg: "'" + item.name + "' successfully moved to '" + item.destination.name + "'."
    };
};