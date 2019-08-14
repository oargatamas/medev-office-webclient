import React, {Component} from "react";
import {Box, LinearProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = (theme) => ({
    root: {
        width:"100%",
        display:"flex",
        justifyContent :"center",
        alignItems:"center",
        flexGrow: 1
    },
    loader: {
        width: "30%"
    }
});

class DriveItemContainerSkeleton extends Component {
    render() {

        const {classes} = this.props;

        return (
            <Box className={classes.root}>
                <LinearProgress className={classes.loader} color={"primary"}/>
            </Box>
        );
    }
}

export default withStyles(styles, {withTheme: true})(DriveItemContainerSkeleton);