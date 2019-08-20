import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";


export const requestFolderCreation = (folderId, data) => {
    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folderId + "/folder",
        redirect_uri: DRIVE_API_BASE,
        body: JSON.stringify(data),
        errorMsg: "Cannot create folder.",
        successMsg: "Folder created",
    };

    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};