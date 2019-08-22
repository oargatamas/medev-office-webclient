import {callOfficeApi, defaultErrorAction} from "./apiCallActions";

export const RECEIVED_MODULE_INFO = "receivedModuleInfo";


export const receivedModuleInfo = (moduleInfo) => {
    return {
        type : RECEIVED_MODULE_INFO,
        modules : moduleInfo.modules
    }
};


export const  requestModuleInfo = (successAction = [receivedModuleInfo], errorAction = [defaultErrorAction]) => {
    let params = {
        method : "GET",
        uri : "/modules",
        redirect_uri : "/",
        errorMsg : "Cannot load module info."
    };
    return callOfficeApi(params, successAction, errorAction)
};
