import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const updateItemPermissions = (item) => {
    const params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.id + "/permission",
        redirect_uri: DRIVE_API_BASE + "/" + item.id,
        body: JSON.stringify(item.permissions),
        errorMsg: "Cannot update item permissions."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};