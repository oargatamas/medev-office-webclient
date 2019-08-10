import React, {Component} from "react";
import {Box, Container, LinearProgress, Typography} from "@material-ui/core";
import medev_logo from "../../../../resources/medev_logo.svg";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    logo: {
        width: "60%",
        align: "center"
    },
    title: {
        fontFamily : "Eras_Bold",
    },
    progressBar: {
        width: "70%",
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
                    <Typography className={classes.title} color={"textSecondary"} variant={"h2"}>MEDEV</Typography>
                    <Typography className={classes.title} color={"textSecondary"} variant={"h4"} align={"right"}>Office</Typography>
                    <br/>
                    {(isErrored) ? (
                        <Typography color={"error"}>{startupError.message}</Typography>
                    ) : (
                        <Typography color={"textSecondary"}>{startupText}</Typography>
                    )}
                    {(!isErrored) ? (<LinearProgress className={classes.progressBar}/>) : null}
                </Box>
            </Container>
        );
    }
}


export default withStyles(styles, {withTheme: false})(SplashScreen);