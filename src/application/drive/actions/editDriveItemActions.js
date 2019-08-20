import {DRIVE_API_BASE} from "./driveApi";
import {callOfficeApi} from "../../core/action/apiCallActions";
import {defaultDialogErrorActions, defaultDialogFetchActions, defaultDialogSuccessActions} from "./dialogActions";


export const saveDriveItem = (item) => {
    const params = {
        method: "POST",
        uri: DRIVE_API_BASE + "/" + item.type + "/" + item.id,
        redirect_uri: DRIVE_API_BASE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': "https://office.medev.local:3000" //Todo create a builder for the headers.
        },
        body: mapItemDataToRequest(item),
        errorMsg: "Cannot delete folder."
    };


    return callOfficeApi(params, defaultDialogSuccessActions, defaultDialogErrorActions, defaultDialogFetchActions);
};


const mapItemDataToRequest = (item) => {
    switch (item.type) {
        case "folder" :
            return {folderName : item.name};
        case "file" :
            return {
                fileName : item.name,
                mimeType : item.mimeType,
            };
        default : return {};
    }
};