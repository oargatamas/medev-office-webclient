import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";
import {requestItemMove} from "../../actions/moveFileToFolder";
import {closeItemDialog, openItemDialog} from "../../actions/dialogActions";
import {requestFolderCreation} from "../../actions/createFolderActions";
import {deleteDriveItem} from "../../actions/deleteItemActions";
import {saveDriveItem} from "../../actions/editDriveItemActions";
import {uploadFileToFolder} from "../../actions/uploadFileActions";
import {updateItemPermissions} from "../../actions/updateItemPermissionActions";
import {switchApplication} from "../../../core/action/sideNavActions";


const mapStateToProps = (state) => {
    return {
        user : state.coreReducer.appUsers.find(user => user.loggedIn),
        systemUsers: state.coreReducer.appUsers,
        isFetching : state.coreReducer.isFetching,
        folder : state.driveReducer.rootFolder,
        items : state.driveReducer.currentFolderItems,
        navigation : state.driveReducer.breadCrumbs,
        permissionTypes : state.driveReducer.permissionTypes,
        isDialogOpen : state.driveReducer.isItemDialogOpen,
        isDialogFetching : state.driveReducer.isItemDialogFetching,
        dialogType : state.driveReducer.itemDialogContentType,
        dialogItem : state.driveReducer.currentDialogItem,
        fetchSuccessResponse: state.coreReducer.successObject
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
            uploadFile: (folder, fileSource) => {
                dispatch(uploadFileToFolder(folder, fileSource));
            },
            updateItemPermissions: (item) => {
                dispatch(updateItemPermissions(item))
            },
            moveItemToFolder : (target, destination) => {
                dispatch(requestItemMove(target,destination));
            }
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);