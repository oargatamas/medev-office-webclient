import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultSuccessWithResponse} from "../../core/action/apiCallActions";


export const requestItemMove = (targetItem, destinationFolder) => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/move/" + targetItem.id + "/to/" + destinationFolder.id,
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        errorMsg: "Cannot move '" + targetItem.name + "' to '" + destinationFolder.name + "'.",
        successMsg : "'" + targetItem.name + "' successfully moved to '" + destinationFolder.name + "'."
    };

    return callOfficeApi(params, defaultSuccessWithResponse);
};