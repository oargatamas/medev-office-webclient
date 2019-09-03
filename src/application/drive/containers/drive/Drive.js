import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";
import {requestFolderTree, requestItemMove} from "../../actions/moveFileToFolder";
import {closeItemDialog, openItemDialog} from "../../actions/dialogActions";
import {requestFolderCreation} from "../../actions/createFolderActions";
import {deleteDriveItem} from "../../actions/deleteItemActions";
import {saveDriveItem} from "../../actions/editDriveItemActions";
import {
    changeFileUploadList,
    clearUploadQueue,
    uploadFileToFolder
} from "../../actions/uploadFileActions";
import {updateItemPermissions} from "../../actions/updateItemPermissionActions";
import {switchApplication} from "../../../core/action/sideNavActions";


const mapStateToProps = (state) => {
    return {
        systemUsers: state.core.appUsers,
        isFetching : state.core.isFetching,
        rootFolder: state.driveModule.drive.folderTree,
        folder : state.driveModule.drive.rootFolder,
        items : state.driveModule.drive.currentFolderItems,
        navigation : state.driveModule.drive.breadCrumbs,
        permissionTypes : state.driveModule.drive.permissionTypes,
        isDialogOpen : state.driveModule.drive.isItemDialogOpen,
        isDialogFetching : state.driveModule.drive.isItemDialogFetching,
        dialogType : state.driveModule.drive.itemDialogContentType,
        dialogItem : state.driveModule.drive.currentDialogItem,
        fetchSuccessResponse: state.core.successObject,
        itemsToUpload: state.driveModule.uploadQueue.items,
        uploadFinished: state.driveModule.uploadQueue.finished,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            changeAppTitle: () =>{
                dispatch(switchApplication("Drive"));
            },
            requestRootFolder : () => {
                dispatch(requestRootFolderData());
            },
            requestFolderContent : (folderId) => {
                dispatch(requestFolderItems(folderId));
            },
            openItemDialog:(purpose, item) =>{
                dispatch(openItemDialog(purpose, item));
            },
            closeItemDialog:() => {
                dispatch(closeItemDialog());
            },
            createFolder: (targetFolderId, data) => {
                dispatch(requestFolderCreation(targetFolderId,data))
            },
            deleteItem: (itemId, itemType) => {
                dispatch(deleteDriveItem(itemId, itemType));
            },
            saveItem: (item) => {
                dispatch(saveDriveItem(item));
            },
            enqueueFilesToUpload : (fileSource) => {
                dispatch(changeFileUploadList(fileSource));
            },
            uploadFiles: (folder, fileSource) => {
                console.log(fileSource);
                for (let i = 0; i < fileSource.length; i++) {
                    dispatch(uploadFileToFolder(folder, fileSource[i].file, i === (fileSource.length-1)));
                }
            },
            clearUploadList: () =>{
                dispatch(clearUploadQueue());
            },
            updateItemPermissions: (item) => {
                dispatch(updateItemPermissions(item))
            },
            requestFolderTree : () =>{
                dispatch(requestFolderTree());
            },
            moveItemToFolder : (target, destination) => {
                dispatch(requestItemMove(target,destination));
            }
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);