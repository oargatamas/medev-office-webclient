import {connect} from "react-redux";
import Dashboard from "../../component/dashboard/Dashboard";
import {switchApplication} from "../../../core/action/sideNavActions";


const mapStateToProps = (state) => {
    return {
        user : state.core.appUsers.find(user => user.loggedIn),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            changeAppTitle: () => {
                dispatch(switchApplication(""));
            },
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);