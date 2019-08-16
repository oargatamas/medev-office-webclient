import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";
import {requestItemMove} from "../../actions/moveFileToFolder";


const mapStateToProps = (state) => {
    return {
        isFetching : state.coreReducer.isFetching,
        rootFolder : state.driveReducer.rootFolder,
        items : state.driveReducer.currentFolderItems,
        navigation : state.driveReducer.breadCrumbs,
        detailsOpen : state.driveReducer.isItemDetailsOpen
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
            moveItemToFolder : (target, destination) => {
                dispatch(requestItemMove(target,destination));
            }
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);