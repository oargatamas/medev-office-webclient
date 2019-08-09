import React, {Component} from "react";
import {Box, Container, LinearProgress, Typography} from "@material-ui/core";
import medev_logo from "../../../../resources/medev_logo.svg";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    logo: {
        width: "50%",
        align: "center"
    },
    progressBar: {
        width: "55%",
    }
});

class SplashScreen extends Component {


    componentDidMount() {
        this.props.startup();
    }

    render() {
        let {classes, startupText, startupError} = this.props;

        let isErrored = Object.keys(startupError).length > 0;

        return (
            <Container className={classes.container} component="main" maxWidth="xs">
                <Box height={"100vh"} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <img className={classes.logo} src={medev_logo}/>
                    <br/>
                    {(isErrored) ? (
                        <Typography color={"error"}>{startupError.message}</Typography>
                    ) : (
                        <Typography>{startupText}</Typography>
                    )}
                    {(!isErrored) ? (<LinearProgress className={classes.progressBar}/>) : null}
                </Box>
            </Container>
        );
    }
}


export default withStyles(styles, {withTheme: false})(SplashScreen);