import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard from "../dashboard/component/dashboard/Dashboard";
import Header from "./components/header/Header";




class App extends Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path="/" component={Dashboard}/>
            </BrowserRouter>
        );
    }
}

export default App;
