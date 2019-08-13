import React, {Component} from "react";
import Drive from "./components/drive/Drive";
import {Route} from "react-router-dom";


export class DriveModule extends Component{
    render() {
        return (
            <div>
                <Route path={"/drive"} component={Drive}/>
            </div>
        );
    }
}