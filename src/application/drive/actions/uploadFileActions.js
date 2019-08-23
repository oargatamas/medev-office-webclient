import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const uploadFileToFolder = (folder, fileSource) => {

    const uploadBody = new FormData();
    uploadBody.append("fileItem",fileSource.files[0]); //Todo consider to handle multiple files

    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + folder.id + "/file",
        redirect_uri: DRIVE_API_BASE+"/"+folder.id,
        headers:{
            "Content-Type" : "multipart/form-data"
        },
        body: uploadBody,
        errorMsg: "Cannot upload file."
    }; //Todo check how it can give back any progress.


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};
