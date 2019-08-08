import {connect} from "react-redux";
import {requestModuleInfo} from "./action/getApplicationActions";
import App from "./components/app/App";


const mapStateToProps = (state) => {
    return {
        isStartup : state.coreReducer.IsAppStartingUp,
        moduleInfo : state.coreReducer.modules,
        errorMsg : state.coreReducer.errorMsg
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchModuleInfo : () => {
            dispatch(requestModuleInfo());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);