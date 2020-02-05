import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const saveDriveItem = (item) => {
    const params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.type + "/" + item.id,
        headers: getApiBaseHeaders(),
        body: JSON.stringify(mapItemDataToRequest(item)),
        errorMsg: "Cannot delete folder."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};


const mapItemDataToRequest = (item) => {
    switch (item.type) {
        case "folder" :
            return {folderName : item.name};
        case "file" :
            return {
                fileName : item.name,
                mimeType : item.mimeType,
            };
        default : return {};
    }
};