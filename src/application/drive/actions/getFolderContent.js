import {callOfficeApi} from "../../core/action/apiCallActions";
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

export const requestFolderItems = (folder) => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/folder/" + folder.id + "/content",
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        errorMsg: "Cannot load content of '"+ folder.name +"'."
    };

    return callOfficeApi(params, receivedFolderItems);
};