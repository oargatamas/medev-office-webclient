import HTTPError from "../exceptions/httpErrors";
import {changeStartUpText} from "./startupActions";

const OFFICE_HOST = "office.medev.local"; //Todo move it to config
const OFFICE_API_HOST = "api.office.medev.local"; //Todo move it to config
const MEDEV_AUTH_HOST = "auth.medev.local"; //Todo move it to config


export const FETCH_API_DATA = "fetchingData";
export const FETCH_API_SUCCESS = "receivedData";
export const FETCH_API_SUCCESS_WITH_RESPONSE = "receivedDataWithResponse";
export const FETCH_API_ERROR = "errorReceivedData";


export const defaultFetchingAction  = () => {
    return {
        type : FETCH_API_DATA
    }
};

export const defaultSuccessAction = () => {
    return {
        type : FETCH_API_SUCCESS
    };
};

export const defaultErrorAction = (error) => {
    console.log(error);
    return {
        type : FETCH_API_ERROR,
        error : error
    }
};

export const defaultSuccessWithResponse = (serverResponse, message) => {
    serverResponse.message = message;
    return {
        type : FETCH_API_SUCCESS_WITH_RESPONSE,
        response : serverResponse
    };
};

export const callOfficeApi = (requestParams, successAction, errorAction = [defaultErrorAction], fetchingAction = [defaultFetchingAction]) => {

    return (dispatch) => {
        let url = "https://" + OFFICE_API_HOST + requestParams.uri;

        fetchingAction.forEach((action) => {dispatch(action());});

        fetch(url, {
            method: requestParams.method,
            headers: requestParams.headers,
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: "include",
            body: requestParams.body,
        })
            .then((response) => {
                console.log("Checking authentication");
                console.log(response);
                if (response.status === 401) {
                    dispatch(broadcastLoginRequired());
                    redirectToAuthServer(requestParams);
                }
                return response;
            })
            .then((response) => {
                console.log("Parsing response");
                if (!response.ok) {
                    console.error(response.statusText);
                    throw new HTTPError(response.status, requestParams.errorMsg);
                }
                console.log(response);
                return response.json();
            })
            .then((parsedResponse) => {
                console.log("Sending response to private component");
                dispatch(defaultSuccessAction());
                successAction.forEach((action) => {dispatch(action(parsedResponse, requestParams.successMsg));});
            })
            .catch((error) => {
                console.log(error);
                errorAction.forEach((action) => {dispatch(action(error));});
            });
    }
};

const broadcastLoginRequired = () => {
    return (dispatch) => {
        dispatch(changeStartUpText("Login required..."));
    };
};


const redirectToAuthServer = (params) => {
    let queryParams = encodeUrlData({
        response_type : "token",
        client_id : "hu.medev.office.clientspa",
        redirect_uri : encodeURI("https://"+ OFFICE_HOST + params.redirect_uri),
        state : "randomstring" //Todo replace it with real csrf token generation logic.
    });

    window.location.href = "https://" + MEDEV_AUTH_HOST + "/authorize?" + queryParams;
};



export const encodeUrlData = (data) => {
    return Object.keys(data).map( (key) => [key, data[key]].map(encodeURIComponent).join("=")).join("&");
};