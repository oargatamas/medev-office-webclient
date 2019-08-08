import {connect} from "react-redux";
import {requestModuleInfo} from "./action/getApplicationActions";
import App from "./components/app/App";


const mapStateToProps = (state) => {
    return {
        moduleInfo : state.coreReducer.modules
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