import {requestModuleInfo} from "../../../core/action/getApplicationActions";
import {connect} from "react-redux";
import Dashboard from "../../component/dashboard/Dashboard";


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       getAppsInfo : () => {
           dispatch(requestModuleInfo());
       }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);