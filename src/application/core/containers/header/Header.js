import {openDrawerAction} from "../../action/sideNavActions";
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {logout} from "../../action/logoutActions";


const mapStateToProps = (state) => {
    return{
        open : state.coreReducer.sideDrawerOpen,
        user : state.coreReducer.appUsers.find(user => user.loggedIn),
        applicationTitle : state.coreReducer.currentApplication
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        openNavigation : () => {
            dispatch(openDrawerAction());
        },
        logout : () => {
            dispatch(logout())
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);

