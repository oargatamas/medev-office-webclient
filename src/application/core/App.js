import {connect} from "react-redux";
import App from "./components/app/App";


const mapStateToProps = (state) => {
    return {
        isStartup : !state.startupReducer.IsFinished,
        errorMsg : state.coreReducer.errorMsg
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);