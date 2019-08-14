import React, {Component} from "react";
import {Box, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    root: {
        flex: "0 0 auto",
    },
});


class DriveHeader extends Component {
    render() {
        const {classes, folder} = this.props;

        return (
            <Box className={classes.root}>
                <Typography variant={"h4"} color={"primary"}>{folder.name}</Typography>
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: false})(DriveHeader);
