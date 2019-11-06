import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const updateItemPermissions = (item) => {
    const params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.id + "/permission",
        headers: getApiBaseHeaders(),
        body: JSON.stringify(item.permissions),
        errorMsg: "Cannot update item permissions."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};