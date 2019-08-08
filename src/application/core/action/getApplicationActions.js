import {callOfficeApi} from "./apiCallActions";

export const RECEIVED_MODULE_INFO = "receivedModuleInfo";


export const receivedModuleInfo = (modules) => {
    return {
        type : RECEIVED_MODULE_INFO,
        modules : modules
    }
};


export const requestModuleInfo = () => {
    let params = {
        method : "GET",
        uri : "/applications",
        redirect_uri : "/",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin' : "https://office.medev.local:3000"
        }
    };
    return callOfficeApi(params, receivedModuleInfo)
};