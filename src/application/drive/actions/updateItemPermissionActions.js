import {DRIVE_API_BASE} from "./driveApi";
import {
    callOfficeApi,
    defaultErrorAction,
    defaultSuccessWithResponse,
    getApiBaseHeaders
} from "../../core/action/apiCallActions";
import {closeItemDialog, finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";


export const updateItemPermissions = (item, isLast) => {
    const params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.id + "/permission",
        headers: getApiBaseHeaders(),
        body: JSON.stringify(item.permissions),
        errorMsg: "Cannot update permissions of '" + item.name + "'. "
    };

    const fetchActions = [
        startItemDialogFetch
    ];

    const successActions = [
        defaultSuccessWithResponse
    ];

    const errorActions = [
        defaultErrorAction
    ];

    if (isLast) {
        successActions.push(finishItemDialogFetch);
        successActions.push(closeItemDialog);
        errorActions.push(finishItemDialogFetch);
    }

    return callOfficeApi(params, successActions, errorActions, fetchActions);
};