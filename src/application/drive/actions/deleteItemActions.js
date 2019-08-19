import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";
import {closeItemDialog, finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";

export const deleteDriveItem = (itemId, type) => {

    let params = {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + type + "/" + itemId,
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        errorMsg: "Cannot delete folder."
    };

    let successActions = [
        defaultSuccessWithResponse,
        finishItemDialogFetch,
        closeItemDialog
    ];

    let errorActions = [
        defaultErrorAction,
        finishItemDialogFetch
    ];

    let fetchActions = [
        startItemDialogFetch
    ];

    return callOfficeApi(params, successActions, errorActions, fetchActions);
};
