import React, {Component} from "react";
import {Box, Container, LinearProgress} from "@material-ui/core";
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

    render() {
        let {classes} = this.props;

        return (
            <Container className={classes.container} component="main" maxWidth="xs">
                <Box height={"100vh"} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <img className={classes.logo} src={medev_logo}/>
                    <br/>
                    <LinearProgress className={classes.progressBar}/>
                </Box>
            </Container>
        );
    }
}


export default withStyles(styles, {withTheme: false})(SplashScreen);