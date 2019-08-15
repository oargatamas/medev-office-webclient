import {requestFolderItems} from "../../actions/getFolderContent";
import DriveItemContainer from "../../components/items/container/DriveItemContainer";
import connect from "react-redux/es/connect/connect";
import {requestItemMove} from "../../actions/moveFileToFolder";


const mapStateToProps = (state) => {
    return {
        isDetailsOpen : state.driveReducer.isItemDetailsOpen,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            requestFolderContent : (folder) => {
                dispatch(requestFolderItems(folder));
            },
            moveItemToFolder : (target, destination) => {
                dispatch(requestItemMove(target,destination));
            },
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(DriveItemContainer);