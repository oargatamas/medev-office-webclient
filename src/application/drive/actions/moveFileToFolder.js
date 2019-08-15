import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";

export const ITEM_MOVEMENT_SUCCESS = "itemMovementSuccess";



const receivedItemMovementResponse = (result) => {
    return {
        type: ITEM_MOVEMENT_SUCCESS,
        result: result
    };
};


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
        errorMsg: "Cannot move '" + targetItem.name + "' to '" + destinationFolder.name + "'."
    };

    return callOfficeApi(params, receivedItemMovementResponse);
};