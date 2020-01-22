import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi, defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";
import {finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";
import {fileTypes} from "./fileTypeDictionary";
import {
    allItemsProcessed,
    itemFetchFailedAction,
    itemFetchingAction,
    itemFetchSuccessAction,
    UPDATE_QUEUE
} from "./itemQueueActions";


export const changeFileUploadList = (fileSource) => {
    let queue = [];

    for (let i = 0; i < fileSource.files.length; i++) {

        const filename = fileSource.files[i].name;
        const extension = filename.split(".").pop();

        queue.push({
            filename: filename,
            file: fileSource.files[i],
            mimeType: fileTypes.find(item => item.extension === extension.toLowerCase()).mimeType,
            uploading: false,
            success: false,
        });
    }

    return {
        type: UPDATE_QUEUE,
        items: queue,
    }
};

export const uploadFileToFolder = (folder, file, isLast, inherit) => {

    const uploadBody = new FormData();
    uploadBody.append("fileItem", file);
    uploadBody.append("inheritPermissions", inherit);

    let params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + folder.id + "/file",
        body: uploadBody,
        errorMsg: "Cannot upload " + file.name + "."
    };

    const fetchActions = [
        startItemDialogFetch,
        itemFetchingAction(file)
    ];

    const successActions = [
        defaultSuccessWithResponse,
        itemFetchSuccessAction(file),
    ];

    const errorActions = [
        defaultErrorAction,
        itemFetchFailedAction(file),
    ];

    if (isLast) {
        successActions.push(finishItemDialogFetch);
        successActions.push(allItemsProcessed);
        errorActions.push(finishItemDialogFetch);
    }

    return callOfficeApi(params, successActions, errorActions, fetchActions);
};

