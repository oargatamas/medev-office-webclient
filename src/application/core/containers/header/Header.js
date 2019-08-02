import {openDrawerAction} from "../../action/sideNavActions";
import Header from "../../components/header/Header";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return{
        open : state.coreReducer.sideDrawerOpen,
        applicationTitle : state.coreReducer.currentApplication
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        openNavigation : () => {
            dispatch(openDrawerAction());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);

