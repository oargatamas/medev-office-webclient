import {receivedModuleInfo, requestModuleInfo} from "./getApplicationActions";


export const CHANGE_STARTUP_TEXT = "changeStartupText";
export const START_UP_FINISHED = "startUpFinished";
export const START_UP_ERROR = "startUpError";
export const INIT_STARTUP = "initStartup";



export const executeStartup = () => {
      return (dispatch) => {
          dispatch(initStartup());
          dispatch(changeStartUpText("Loading module info"));
          dispatch(requestModuleInfo([receivedModuleInfoAtStartup],[setStartUpError]));
      }
};

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


export const receivedModuleInfoAtStartup = (modules) => {
    return (dispatch) =>{
        dispatch(changeStartUpText("Loading dashboard"));
        dispatch(receivedModuleInfo(modules));
        dispatch(setStartUpFinished());
    };
};
