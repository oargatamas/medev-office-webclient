import React, {Component} from "react";
import {Route} from "react-router-dom";
import Drive from "./containers/drive/Drive";


export class DriveModule extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path={"/drive/:id?"} component={(props)=>(<Drive key={props.match.params.id} {...props}/>)}/>
            </React.Fragment>
        );
    }
}