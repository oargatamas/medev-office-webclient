import {requestRootFolderId} from "../../actions/getRootFolder";
import Drive from "../../components/drive/Drive";
import connect from "react-redux/es/connect/connect";


const mapStateToProps = (state) => {
    return {
        rootFolder : state.driveReducer.rootFolder,
        items : state.driveReducer.currentFolderItems,
        navigation : state.driveReducer.breadCrumbs,
        detailsOpen : state.driveReducer.isItemDetailsOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestRootFolder : () => {
            dispatch(requestRootFolderId());
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Drive);