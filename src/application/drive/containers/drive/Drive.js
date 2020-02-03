import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderCreation, requestFolderItems, requestRootFolderData} from "../../actions/folderActions";
import {mapItemToMoveParams, requestFolderTree} from "../../actions/itemMoveActions";
import {closeItemDialog, openItemDialog} from "../../actions/dialogActions";
import {mapItemToUploadParams,} from "../../actions/itemUploadActions";
import {switchApplication} from "../../../core/action/sideNavActions";
import {clearItemQueue, enqueueItems, queueProcessor} from "../../actions/itemQueueActions";
import {saveDriveItem} from "../../actions/itemUpdateActions";
import {mapItemToPermissionChangeParams} from "../../actions/itemPermissionActions";
import {mapItemToDeleteParams} from "../../actions/deleteItemActions";


const mapStateToProps = (state) => {
    return {
        systemUsers: state.core.appUsers,
        isFetching : state.core.isFetching,
        folderTree: state.driveModule.drive.folderTree,
        rootFolder : state.driveModule.drive.rootFolder,
        folder: state.driveModule.drive.parentFolder,
        items : state.driveModule.drive.currentFolderItems,
        navigation : state.driveModule.drive.breadCrumbs,
        permissionTypes : state.driveModule.drive.permissionTypes,
        isDialogOpen : state.driveModule.drive.isItemDialogOpen,
        isDialogFetching : state.driveModule.drive.isItemDialogFetching,
        dialogType : state.driveModule.drive.itemDialogContentType,
        dialogItem : state.driveModule.drive.currentDialogItem,
        fetchSuccessResponse: state.core.successObject,
        itemQueue: state.driveModule.scheduledOperations.itemQueue,
        itemQueueFinished: state.driveModule.scheduledOperations.finished,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            changeAppTitle: () =>{
                dispatch(switchApplication("Drive"));
            },
            folder:{
                requestRoot : () => {
                    dispatch(requestRootFolderData());
                },
                requestContent : (folderId) => {
                    dispatch(requestFolderItems(folderId));
                },
                requestFolderTree : (rootFolder, includeFiles) =>{
                    dispatch(requestFolderTree(rootFolder, includeFiles));
                },
                create: (targetFolderId, data) => {
                    dispatch(requestFolderCreation(targetFolderId,data))
                },
            },
            item:{
                update: (item) => {
                    dispatch(saveDriveItem(item))
                },
            },
            itemQueue: {
                clear: () =>{
                    dispatch(clearItemQueue());
                },
                enqueue:(items) => {
                  dispatch(enqueueItems(items))
                },
                process:{
                    toUpload:(items) => {
                        queueProcessor(dispatch,items,mapItemToUploadParams,false);
                    },
                    toMove: (items) => {
                        queueProcessor(dispatch,items,mapItemToMoveParams)
                    },
                    toDelete : (items) =>{
                        queueProcessor(dispatch,items,mapItemToDeleteParams)
                    },
                    toPermission : (items) => {
                        queueProcessor(dispatch,items,mapItemToPermissionChangeParams);
                    },
                }
            },
            dialog:{
                open:(purpose, item) =>{
                    dispatch(openItemDialog(purpose, item));
                },
                close:() => {
                    dispatch(closeItemDialog());
                },
            },
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);