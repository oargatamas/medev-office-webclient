import React, {Component} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import {Box, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";


const styles = (theme) => ({
    root: {
        width:"40%",
        display: "flex",
        flexDirection: "row",
        alignItems:"center"
    },
    divider: {
        color: "green"
    }
});


class NavigationBarSkeleton extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Box className={classes.root}>
                <Skeleton width={"30%"}/>
                <Typography color={"textSecondary"} variant={"h5"}>/</Typography>
                <Skeleton width={"30%"}/>
                <Typography color={"textSecondary"} variant={"h5"}>/</Typography>
                <Skeleton width={"30%"}/>
            </Box>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NavigationBarSkeleton);