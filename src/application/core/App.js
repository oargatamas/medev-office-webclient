import {connect} from "react-redux";
import App from "./components/app/App";


const mapStateToProps = (state) => {
    return {
        isStartup : !state.startupReducer.IsFinished,
        errorObject : state.coreReducer.errorObject
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);