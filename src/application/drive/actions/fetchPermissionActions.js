import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const FETCH_PERMISSIONS_SUCCESS = "drivePermissionTypesReceived";


export const receivedDrivePermissionTypes = (permissionTypes) => {
    return {
        type: FETCH_PERMISSIONS_SUCCESS,
        enumeration : permissionTypes,
    };
};


export const fetchPermissionTypes = () => {
    let params = {
        method: "GET",
        uri: DRIVE_API_BASE + "/permission/types",
        redirect_uri: "",
        errorMsg: "Cannot fetch drive permission types."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};