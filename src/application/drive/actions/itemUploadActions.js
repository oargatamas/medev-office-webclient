import {DRIVE_API_BASE} from "./driveApi";
import {fileTypes} from "./fileTypeDictionary";


export const enqueueFilesToUpload = (fileSource, folder) => {
    let queue = [];

    for (let i = 0; i < fileSource.files.length; i++) {

        const filename = fileSource.files[i].name;
        const extension = filename.split(".").pop();

        queue.push({
            file: fileSource.files[i],
            folder : folder,
            mimeType: fileTypes.find(item => item.extension === extension.toLowerCase()).mimeType,
            fetching: false,
            success: false,
        });
    }

    return queue;
};

export const mapItemToUploadParams = (item) => {

    const uploadBody = new FormData();
    uploadBody.append("fileItem", item.file);
    uploadBody.append("inheritPermissions", item.inheritPermissions);

    return {
        method: "POST",
        uri: DRIVE_API_BASE + "/folder/" + item.folder + "/file",
        body: uploadBody,
        errorMsg: "Cannot upload " + item.file.name + "."
    };
};

