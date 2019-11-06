import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";

export const deleteDriveItem = (itemId, type) => {

    let params = {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + type + "/" + itemId,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot delete folder."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};
