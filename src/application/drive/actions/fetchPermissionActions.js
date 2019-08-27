import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultErrorAction, getApiBaseHeaders} from "../../core/action/apiCallActions";


export const FETCH_PERMISSIONS_SUCCESS = "drivePermissionTypesReceived";


export const receivedDrivePermissionTypes = (permissionTypes) => {
    return {
        type: FETCH_PERMISSIONS_SUCCESS,
        enumeration : permissionTypes,
    };
};


export const fetchPermissionTypes = (successAction = [receivedDrivePermissionTypes], errorAction = [defaultErrorAction]) => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/permission/types",
        redirect_uri: "/",
        headers: getApiBaseHeaders(),
        errorMsg: "Cannot fetch drive permission types."
    };

    return callOfficeApi(params, successAction, errorAction);
};