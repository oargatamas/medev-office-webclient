import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "../../containers/header/Header";
import {CssBaseline} from "@material-ui/core";
import Navigation from "../../containers/navigation/Navigation";
import {withStyles} from "@material-ui/styles";
import DashboardContainer from "../../../dashboard/component/dashboard/DashboardContainer";
import SplashScreen from "../../components/splashScreen/SplashScreen";
import {withSnackbar} from "notistack";


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


    componentDidMount() {
        console.log(this.props);
        this.props.fetchModuleInfo();
    }

    render() {
        const {classes, isStartup} = this.props;

        if (this.props.errorMsg) {
            this.props.enqueueSnackbar(this.props.errorMsg,{variant:"error"});
        }

        return (
            <div className={classes.root}>
                <CssBaseline/>
                {isStartup ? ( //Todo ez itt nem jó
                    <SplashScreen/>
                ) : (
                    <BrowserRouter>
                        <Header/>
                        <Navigation/>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            <Route path="/" component={DashboardContainer}/>
                        </main>
                    </BrowserRouter>
                )}
            </div>
        );
    }
}

export default withSnackbar(withStyles(styles, {withTheme: true})(App));