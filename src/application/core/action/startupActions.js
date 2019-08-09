import {receivedModuleInfo, requestModuleInfo} from "./getApplicationActions";


export const CHANGE_STARTUP_TEXT = "changeStartupText";
export const START_UP_FINISHED = "startUpFinished";




export const executeStartup = () => {
      return (dispatch) => {
          dispatch(changeStartUpText("Start application"));
          dispatch(changeStartUpText("Loading module info"));
          dispatch(requestModuleInfo(receiverModuleInfoAtStartup));
      }
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

export const receiverModuleInfoAtStartup = (modules) => {
    return (dispatch) =>{
        dispatch(changeStartUpText("Loading dashboard"));
        dispatch(receivedModuleInfo(modules));
        dispatch(setStartUpFinished());
    };
};
