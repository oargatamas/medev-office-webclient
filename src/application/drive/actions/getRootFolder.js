import {callOfficeApi} from "../../core/action/apiCallActions";


const DRIVE_API_BASE = "/drive";

export const RECEIVED_ROOT_FOLDER_ID = "receivedRootFolderId";


export const receivedRootFolderId = (id) => {
    return {
        type: RECEIVED_ROOT_FOLDER_ID,
        folderId: id
    };
};

export const requestRootFolderId = (successAction = receivedRootFolderId) => {
    let params = {
        method : "GET",
        uri : DRIVE_API_BASE + "/folder/root",
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