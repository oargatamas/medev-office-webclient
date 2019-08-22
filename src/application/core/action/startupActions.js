import {receivedModuleInfo, requestModuleInfo} from "./getModuleInfoActions";
import {receivedUserInfo, requestUserInfo} from "./getUserInfoActions";


export const CHANGE_STARTUP_TEXT = "changeStartupText";
export const START_UP_FINISHED = "startUpFinished";
export const START_UP_ERROR = "startUpError";
export const INIT_STARTUP = "initStartup";

export const initStartup = () => {
    return {
        type: INIT_STARTUP
    };
};


export const changeStartUpText = (text) => {
    return {
        type : CHANGE_STARTUP_TEXT,
        text : text
    }
};


export const setStartUpFinished = () => {
    return {
        type : START_UP_FINISHED,
    }
};

export const setStartUpError = (error) => {
    return {
        type: START_UP_ERROR,
        error : (error.statusCode && error.statusCode === 401) ? null : error
    }
};




export const executeStartup = () => {
      return (dispatch) => {
          dispatch(initStartup());
          dispatch(changeStartUpText("Loading user info"));
          dispatch(requestUserInfo([receivedUserInfoAtStartup],[setStartUpError]));
          //dispatch(requestModuleInfo([receivedModuleInfoAtStartup],[setStartUpError]));
      }
};

export const receivedUserInfoAtStartup = (userInfo) => {
    return (dispatch) => {
        dispatch(receivedUserInfo(userInfo));
        dispatch(changeStartUpText("Loading module info"));
        dispatch(requestModuleInfo([receivedModuleInfoAtStartup],[setStartUpError]));
    };
};

export const receivedModuleInfoAtStartup = (modules) => {
    return (dispatch) =>{
        dispatch(receivedModuleInfo(modules));
        dispatch(setStartUpFinished());
    };
};


