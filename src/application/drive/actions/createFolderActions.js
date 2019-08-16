import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";
import {closeItemDialog, finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";


export const requestFolderCreation = (folderId, data) => {
    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folderId + "/folder",
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        body: JSON.stringify(data),
        errorMsg: "Cannot create folder.",
        successMsg: "Folder created",
    };

    let successActions = [
        defaultSuccessWithResponse,
        finishItemDialogFetch,
        closeItemDialog
    ];

    let errorActions = [
        defaultErrorAction,
        finishItemDialogFetch
    ];

    let fetchActions = [
        startItemDialogFetch
    ];

    return callOfficeApi(params, successActions, errorActions, fetchActions);
};