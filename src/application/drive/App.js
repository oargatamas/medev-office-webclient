import React, {Component} from "react";
import {Route} from "react-router-dom";
import Drive from "./containers/drive/Drive";


export class DriveModule extends Component{
    render() {
        return (
            <Route path={"/drive"} component={Drive}/>
        );
    }
}