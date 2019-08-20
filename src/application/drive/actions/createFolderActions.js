import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";


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

    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};