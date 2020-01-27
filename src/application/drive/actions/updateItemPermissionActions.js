import {DRIVE_API_BASE} from "./driveApi";
import {getApiBaseHeaders} from "../../core/action/apiCallActions";
import {UPDATE_QUEUE} from "./itemQueueActions";

export const enqueueItemsToPermissionChange = (items) => {
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


export const mapItemToPermissionChangeParams = (item) => {
    return {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.id + "/permission",
        headers: getApiBaseHeaders(),
        body: JSON.stringify(item.permissions),
        errorMsg: "Cannot update permissions of '" + item.name + "'. "
    };
};
