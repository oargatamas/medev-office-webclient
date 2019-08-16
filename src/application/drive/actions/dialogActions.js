export const DIALOG_FETCH_START = "DriveDialogFetchStart";
export const DIALOG_FETCH_SUCCESS = "driveDialogFetchFinished";

export const OPEN_DIALOG = "openDriveDialog";
export const CLOSE_DIALOG = "closeDriveDialog";


export const openDialog = (purpose) => {
    return {
        type: OPEN_DIALOG,
        contentType: purpose,
    }
};

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG,
    };
};


export const startDialogFetch = () => {
    return {
        type: DIALOG_FETCH_START
    }
};

export const finishDialogFetch = () => {
    return {
        type: DIALOG_FETCH_SUCCESS
    };
};