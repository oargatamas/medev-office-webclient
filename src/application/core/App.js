import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./containers/header/Header";
import {CssBaseline} from "@material-ui/core";
import Navigation from "./containers/navigation/Navigation";
import {withStyles} from "@material-ui/styles";
import DashboardContainer from "../dashboard/component/dashboard/DashboardContainer";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class App extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <BrowserRouter>
                    <Header/>
                    <Navigation/>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Route path="/" component={DashboardContainer}/>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);
