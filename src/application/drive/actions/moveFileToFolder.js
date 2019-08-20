import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultSuccessWithResponse} from "../../core/action/apiCallActions";


export const requestItemMove = (targetItem, destinationFolder) => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/move/" + targetItem.id + "/to/" + destinationFolder.id,
        redirect_uri: DRIVE_API_BASE,
        errorMsg: "Cannot move '" + targetItem.name + "' to '" + destinationFolder.name + "'.",
        successMsg : "'" + targetItem.name + "' successfully moved to '" + destinationFolder.name + "'."
    };

    return callOfficeApi(params, [defaultSuccessWithResponse]);
};