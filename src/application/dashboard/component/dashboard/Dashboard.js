import React, {Component} from 'react';
import Button from "@material-ui/core/Button";


class Dashboard extends Component{

    render() {
        return(
            <div>
                <h1>Dashboard</h1>
                <Button onClick={this.props.getAppsInfo}>Get Application Info</Button>
            </div>
        );
    }
}

export default Dashboard;