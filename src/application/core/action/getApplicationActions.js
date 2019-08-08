import {callOfficeApi} from "./apiCallActions";

const RECEIVED_APPLICATIONS_INFO = "receivedAppsInfo";


export const receivedAppsInfo = (apps) => {
    console.log(apps);
    return {
        type : RECEIVED_APPLICATIONS_INFO,
        apps : apps
    }
};


export const requestAppsInfo = () => {
    let params = {
        method : "GET",
        uri : "/applications",
        redirect_uri : ":3000/",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin' : "https://office.medev.local:3000"
        }
    };
    return callOfficeApi(params, receivedAppsInfo)
};