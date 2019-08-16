import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";
import {requestItemMove} from "../../actions/moveFileToFolder";
import {closeItemDialog, openItemDialog} from "../../actions/dialogActions";
import {requestFolderCreation} from "../../actions/createFolderActions";


const mapStateToProps = (state) => {
    return {
        isFetching : state.coreReducer.isFetching,
        folder : state.driveReducer.rootFolder,
        items : state.driveReducer.currentFolderItems,
        navigation : state.driveReducer.breadCrumbs,
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
            moveItemToFolder : (target, destination) => {
                dispatch(requestItemMove(target,destination));
            }
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);