import {defaultErrorAction, defaultFetchingAction, MEDEV_AUTH_HOST, OFFICE_HOST} from "./apiCallActions";
import HTTPError from "../exceptions/httpErrors";

export const logout = () => {
    return (dispatch) => {
        const url = "https://" + MEDEV_AUTH_HOST + "/idp/logout";

        dispatch(defaultFetchingAction());

        fetch(url, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: "include",
        }).then((response) => {
            console.log("Parsing response");
            if (!response.ok) {
                console.error(response.statusText);
                throw new HTTPError(response.status, response.statusText);
            }
            window.location.replace("https://" + OFFICE_HOST + "/");
        }).catch((error) => {
            console.log(error);
            dispatch(defaultErrorAction(error));
        });
    };
};