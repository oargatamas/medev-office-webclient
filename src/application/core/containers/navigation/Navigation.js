import {closeDrawerAction} from "../../action/sideNavActions";
import {connect} from "react-redux";
import Navigation from "../../components/navigation/Navigation";


const mapStateToProps = (state) => {
    return{
        open : state.coreReducer.sideDrawerOpen,
        modules: state.coreReducer.modules,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        closeNavigation : () => {
            dispatch(closeDrawerAction());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);

