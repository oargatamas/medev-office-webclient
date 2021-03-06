import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "../../containers/header/Header";
import {CssBaseline} from "@material-ui/core";
import Navigation from "../../containers/navigation/Navigation";
import {withStyles} from "@material-ui/styles";
import {withSnackbar} from "notistack";
import SplashScreen from "../../containers/splashScreen/SplashScreen";
import ModuleContainer from "../../containers/moduleContainer/ModuleContainer";


const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
    }
});

class App extends Component {

    render() {
        const {classes, isStartup, errorObject} = this.props;

        if (errorObject) {
            this.props.enqueueSnackbar(errorObject.message,{variant:"error"});
        }

        return (
            <div className={classes.root}>
                <CssBaseline/>
                {(isStartup) ? (
                    <SplashScreen/>
                ) : (
                    <BrowserRouter>
                        <Header/>
                        <Navigation/>
                        <ModuleContainer/>
                    </BrowserRouter>
                )}
            </div>
        );
    }
}

export default withSnackbar(withStyles(styles, {withTheme: true})(App));