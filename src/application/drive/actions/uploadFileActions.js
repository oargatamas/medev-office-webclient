import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";
import {finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";
import {fileTypes} from "./fileTypeDictionary";


export const UPDATE_ITEM_QUEUE = "driveSetUploadQueue";
export const CLEAR_ITEM_QUEUE = "driveClearUploadQueue";
export const ITEMS_UPLOADED = "driveItemsUploaded";
export const ITEM_UPLOAD_FETCH = "driveItemUploadFetch";
export const ITEM_UPLOAD_SUCCESS = "driveItemUploadSuccess";
export const ITEM_UPLOAD_ERROR = "driveItemUploadError";


export const changeFileUploadList = (fileSource) => {
    let queue = [];

    for (let i = 0; i < fileSource.files.length; i++) {
        console.log(fileSource.files[i]);
        const filename = fileSource.files[i].name;
        const extension = filename.split(".").pop();

        queue.push({
            filename: filename,
            file: fileSource.files[i],
            mimeType: fileTypes.find(item => item.extension === extension).mimeType,
            uploading: false,
            success: false,
        });
    }

    return {
        type: UPDATE_ITEM_QUEUE,
        items: queue,
    }
};

export const uploadFileToFolder = (folder, file, isLast) => {

    const uploadBody = new FormData();
    uploadBody.append("fileItem", file);

    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folder.id + "/file",
        body: uploadBody,
        errorMsg: "Cannot upload " + file.name + "."
    };

    const fetchActions = [
        startItemDialogFetch,
        fileUploadingAction(file)
    ];

    const successActions = [
        defaultSuccessWithResponse,
        fileUploadedAction(file),
    ];

    const errorActions = [
        defaultErrorAction,
        fileUploadFailed(file),
    ];

    if (isLast) {
        successActions.push(finishItemDialogFetch);
        successActions.push(allFilesUploaded);
        errorActions.push(finishItemDialogFetch);
    }

    return callOfficeApi(params, successActions, errorActions, fetchActions);
};

export const allFilesUploaded = () => {
    return {
        type: ITEMS_UPLOADED
    };
};


export const clearUploadQueue = () => {
    return {
        type: CLEAR_ITEM_QUEUE
    };
};

export const fileUploadingAction = (file) => {
    return () => ({
        type: ITEM_UPLOAD_FETCH,
        filename: file.name
    });
};

export const fileUploadedAction = (file) => {
    return () => ({
        type: ITEM_UPLOAD_SUCCESS,
        filename: file.name
    });
};

export const fileUploadFailed = (file) => {
    return () => ({
        type: ITEM_UPLOAD_ERROR,
        filename: file.name
    });
};