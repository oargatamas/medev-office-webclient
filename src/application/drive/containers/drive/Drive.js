import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";
import {requestFolderTree} from "../../actions/moveFileToFolder";
import {closeItemDialog, openItemDialog} from "../../actions/dialogActions";
import {requestFolderCreation} from "../../actions/createFolderActions";
import {enqueueFilesToUpload, mapItemToUploadParams,} from "../../actions/uploadFileActions";
import {switchApplication} from "../../../core/action/sideNavActions";
import {clearItemQueue, queueProcessor} from "../../actions/itemQueueActions";


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
            itemQueue: {
                clear: () =>{
                    dispatch(clearItemQueue());
                },
                enqueue: {
                    toUpload:(items,destination) => {
                        dispatch(enqueueFilesToUpload(items,destination));
                    },
                    toMove: (items) => {
                        dispatch();
                    },
                    toDelete : (items) =>{
                        dispatch();
                    },
                    toPermission : (items) => {
                        dispatch();
                    },
                },
                process:{
                    toUpload:(items) => {
                        queueProcessor(dispatch,items,mapItemToUploadParams);
                    },
                    toMove: (items) => {
                        dispatch();
                    },
                    toDelete : (items) =>{
                        dispatch();
                    },
                    toPermission : (items) => {
                        dispatch();
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