import {fetchPermissionTypes, receivedDrivePermissionTypes} from "./fetchPermissionActions";
import {changeStartUpText, setStartUpError, setStartUpFinished} from "../../core/action/startupActions";

export const initDrive = () => {
    return (dispatch) => {
        dispatch(changeStartUpText("Drive - Loading permission types"));
        dispatch(fetchPermissionTypes([receivedPermissionTypesAtStartup],[setStartUpError]));
    };
};


export const receivedPermissionTypesAtStartup = (permissions) => {
    return (dispatch) =>{
        dispatch(receivedDrivePermissionTypes(permissions));
        dispatch(setStartUpFinished());
    };
};

