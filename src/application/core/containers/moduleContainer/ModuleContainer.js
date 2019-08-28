import {connect} from "react-redux";
import ModuleContainer from "../../components/moduleContainer/ModuleContainer";


const mapStateToProps = (state) => {
    return {
        modules : state.core.modules
    };
};



export default connect(mapStateToProps)(ModuleContainer);