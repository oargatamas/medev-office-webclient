import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";

export const deleteDriveItem = (item) => {

    let params = {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + item.type + "/" + item.id,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot delete '" + item.name + "'."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};
