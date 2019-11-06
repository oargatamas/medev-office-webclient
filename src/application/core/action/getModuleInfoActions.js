import {callOfficeApi, defaultErrorAction, getApiBaseHeaders} from "./apiCallActions";
import {moduleInitActions} from "./startupActions";

export const RECEIVED_MODULE_INFO = "receivedModuleInfo";


export const receivedModuleInfo = (moduleInfo) => {
    return {
        type : RECEIVED_MODULE_INFO,
        modules : moduleInfo
    }
};


export const requestModuleInfo = (successAction = [receivedModuleInfo], errorAction = [defaultErrorAction]) => {
    let params = {
        method : "GET",
        uri : "/modules",
        headers: getApiBaseHeaders(),
        errorMsg : "Cannot load module info."
    };
    return callOfficeApi(params, successAction, errorAction)
};


export const initModules = (moduleInfo) => {
    return (dispatch) => {
        moduleInfo.forEach((module)=>{
            const initAction = moduleInitActions[module.name];
            if(initAction){
                dispatch(initAction());
            }
        });

    };
};