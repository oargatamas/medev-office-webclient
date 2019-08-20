import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";

export const deleteDriveItem = (itemId, type) => {

    let params = {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + type + "/" + itemId,
        redirect_uri: DRIVE_API_BASE,
        errorMsg: "Cannot delete folder."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};
