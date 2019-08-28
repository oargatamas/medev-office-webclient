import {connect} from "react-redux";
import App from "./components/app/App";


const mapStateToProps = (state) => {
    return {
        isStartup : !state.startup.IsFinished,
        errorObject : state.core.errorObject,
        modules : state.core.modules,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);