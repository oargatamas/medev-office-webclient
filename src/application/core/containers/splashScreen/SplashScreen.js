import SplashScreen from "../../components/splashScreen/SplashScreen";
import {connect} from "react-redux";
import {executeStartup} from "../../action/startupActions";


const mapStateToProps = (state) =>{
    return {
        startupText : state.startupReducer.currentTask,
        startupError : state.startupReducer.errorObject
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        startup : () => {
            dispatch(executeStartup());
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen);