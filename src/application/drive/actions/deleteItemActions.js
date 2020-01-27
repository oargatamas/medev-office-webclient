import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, getApiBaseHeaders} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions,} from "./dialogActions";
import {UPDATE_QUEUE} from "./itemQueueActions";

export const deleteDriveItem = (item) => {

    let params = {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + item.type + "/" + item.id,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot delete '" + item.name + "'."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};


export const enqueueItemsToDelete = (items) => {
    let queue = items.map((item) => {
        return {
            ...item,
            fetching: false,
            success: false,
        }
    });

    return {
        type: UPDATE_QUEUE,
        items: queue,
    }
};


export const mapItemToDeleteParams = (item) => {
    return {
        method: "DELETE",
        uri: DRIVE_API_BASE + "/" + item.type + "/" + item.id,
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot delete '" + item.name + "'."
    };
};
