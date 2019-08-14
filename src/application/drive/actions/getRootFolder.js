import {callOfficeApi} from "../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "./driveApi";


export const RECEIVED_ROOT_FOLDER_DATA = "receivedRootFolderId";


export const receivedRootFolderId = (folderInfo) => {
    return {
        type: RECEIVED_ROOT_FOLDER_DATA,
        folder: folderInfo
    };
};

export const requestRootFolderId = (successAction = receivedRootFolderId) => {
    let params = {
        method : "GET",
        uri : DRIVE_API_BASE + "/folder/root?meta=true",
        redirect_uri : DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin' : "https://office.medev.local:3000"
        },
        errorMsg : "Cannot load root folder data."
    };

    return callOfficeApi(params,successAction);
};