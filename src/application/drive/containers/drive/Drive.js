import {requestRootFolderData} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";
import {requestFolderItems} from "../../actions/getFolderContent";


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
        requestRootFolder : () => {
            dispatch(requestRootFolderData());
        },
        requestFolderContent : (folderId) => {
            dispatch(requestFolderItems(folderId));
        },
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);