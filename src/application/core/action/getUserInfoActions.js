import {callOfficeApi, defaultErrorAction} from "./apiCallActions";

export const RECEIVED_USER_INFO = "receivedUserInfo";


export const receivedUserInfo = (userInfo) => {
    return {
        type : RECEIVED_USER_INFO,
        users : userInfo
    }
};


export const  requestUserInfo = (successAction = [receivedUserInfo], errorAction = [defaultErrorAction]) => {
    let params = {
        method : "GET",
        uri : "/user/info",
        redirect_uri : "/",
        errorMsg : "Cannot load user info."
    };
    return callOfficeApi(params, successAction, errorAction)
};