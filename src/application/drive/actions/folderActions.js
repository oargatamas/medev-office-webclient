import {callOfficeApi, encodeUrlData, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "./driveApi";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const RECEIVED_FOLDER_CONTENT = "receivedFolderContent";
export const RECEIVED_ROOT_FOLDER_DATA = "receivedRootFolderData";


export const receivedFolderItems = (serverResponse) => {
    return {
        type: RECEIVED_FOLDER_CONTENT,
        rootFolder : serverResponse.meta,
        parents : serverResponse.parents.reverse(),
        content: serverResponse.content
    };
};

export const requestFolderItems = (folderId) => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/" + folderId + "/content",
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot load content folder content."
    };

    return callOfficeApi(params, [receivedFolderItems]);
};


export const requestFolderCreation = (folderId, data) => {

    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folderId + "/folder",
        headers: getApiBaseHeaders(),
        body: JSON.stringify(data),
        errorMsg: "Cannot create folder.",
        successMsg: "Folder created",
    };

    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};

const receivedRootFolderData = (folderInfo) => {
    return {
        type: RECEIVED_ROOT_FOLDER_DATA,
        folder: folderInfo.meta,
        content: folderInfo.content
    };
};

export const requestRootFolderData = (successAction = [receivedRootFolderData]) => {

    let query = {
        meta: true,
        content: true,
    };

    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/root?" + encodeUrlData(query), //Todo Clean it up
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot load root folder data."
    };

    return callOfficeApi(params, successAction);
};