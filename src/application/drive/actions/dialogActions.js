import {defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";

export const DIALOG_FETCH_START = "DriveDialogFetchStart";
export const DIALOG_FETCH_SUCCESS = "driveDialogFetchFinished";

export const OPEN_DIALOG = "openDriveDialog";
export const CLOSE_DIALOG = "closeDriveDialog";


export const CONTENT_NEW_FOLDER = "createNewFolderOnDrive";
export const CONTENT_UPLOAD_FILE = "uploadFileToDrive";
export const CONTENT_EDIT_PERMISSIONS = "editDriveItemPermissions";
export const CONTENT_EDIT_DETAILS = "editDriveItemDetails";
export const CONTENT_SHARE_LINK = "createDriveItemShareLink";
export const CONTENT_DELETE_ITEM = "deleteDriveItem";


export const openItemDialog = (purpose, item) => {
    return {
        type: OPEN_DIALOG,
        contentType: purpose,
        item: item,
    }
};

export const closeItemDialog = () => {
    return {
        type: CLOSE_DIALOG,
    };
};


export const startItemDialogFetch = () => {
    return {
        type: DIALOG_FETCH_START
    }
};

export const finishItemDialogFetch = () => {
    return {
        type: DIALOG_FETCH_SUCCESS
    };
};

export const defaultDialogSuccessActions = [
    defaultSuccessWithResponse,
    finishItemDialogFetch,
    closeItemDialog
];

export const defaultDialogErrorActions = [
    defaultErrorAction,
    finishItemDialogFetch
];

export const defaultDialogFetchActions = [
    startItemDialogFetch
];