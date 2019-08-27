import {callOfficeApi, defaultErrorAction, getApiBaseHeaders} from "./apiCallActions";

export const RECEIVED_USER_INFO = "receivedUserInfo";


export const receivedUserInfo = (userInfo) => {
    return {
        type : RECEIVED_USER_INFO,
        users : userInfo
    }
};


export const requestUserInfo = (successAction = [receivedUserInfo], errorAction = [defaultErrorAction]) => {
    let params = {
        method : "GET",
        uri : "/user/info",
        redirect_uri : "/",
        headers: getApiBaseHeaders(),
        errorMsg : "Cannot load user info."
    };
    return callOfficeApi(params, successAction, errorAction)
};


export const mapUsersToOptions = (users) => users.map( user => ({
    label: user.firstName + " " + user.lastName,
    value: user
}));