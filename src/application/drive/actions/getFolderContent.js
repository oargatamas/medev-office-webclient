import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "./driveApi";


export const RECEIVED_FOLDER_CONTENT = "receivedFolderContent";


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
        redirect_uri: DRIVE_API_BASE,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot load content folder content."
    };

    return callOfficeApi(params, [receivedFolderItems]);
};