import {connect} from "react-redux";
import ModuleContainer from "../../components/moduleContainer/ModuleContainer";


const mapStateToProps = (state) => {
    return {
        modules : state.coreReducer.modules
    };
};



export default connect(mapStateToProps)(ModuleContainer);