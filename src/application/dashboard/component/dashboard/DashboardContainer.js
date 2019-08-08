import {requestAppsInfo} from "../../../core/action/getApplicationActions";
import {connect} from "react-redux";
import Dashboard from "./Dashboard";


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       getAppsInfo : () => {
           dispatch(requestAppsInfo());
       }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);