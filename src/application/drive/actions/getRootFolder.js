import {callOfficeApi, encodeUrlData} from "../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "./driveApi";


export const RECEIVED_ROOT_FOLDER_DATA = "receivedRootFolderData";


const receivedRootFolderData = (folderInfo) => {
    return {
        type: RECEIVED_ROOT_FOLDER_DATA,
        folder: folderInfo.meta,
        content: folderInfo.content
    };
};

export const requestRootFolderData = (successAction = receivedRootFolderData) => {

    let query = {
        meta: true,
        content: true,
    };

    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/root?" + encodeUrlData(query), //Todo Clean it up
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        errorMsg: "Cannot load root folder data."
    };

    return callOfficeApi(params, successAction);
};