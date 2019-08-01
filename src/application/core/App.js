import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard from "../dashboard/component/dashboard/Dashboard";




class App extends Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Dashboard}/>
            </BrowserRouter>
        );
    }
}

export default App;
