import React, {Component} from "react";
import {Route} from "react-router-dom";
import Dashboard from "./container/dashboard/Dashboard";


export class DashBoardModule extends Component {
    render() {
        return (
            <div>
                <Route path={"/dashboard"} component={Dashboard}/>
                <Route path={"/home"} component={Dashboard}/>
                <Route path={"/"} exact component={Dashboard}/>
            </div>
        );
    }
}
