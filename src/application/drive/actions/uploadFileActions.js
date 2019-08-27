import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const uploadFileToFolder = (folder, fileSource) => {

    const uploadBody = new FormData();

    uploadBody.append("fileItem", fileSource.files[0]);

    console.log(fileSource);

    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folder.id + "/file",
        redirect_uri: DRIVE_API_BASE + "/" + folder.id,
        body: uploadBody,
        errorMsg: "Cannot upload file."
    }; //Todo check how it can give back any progress.


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};
