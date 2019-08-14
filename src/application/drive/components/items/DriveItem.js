import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 200,
        margin: theme.spacing(1),
        backgroundColor: "lightGrey",
    }
});

class DriveItem extends Component {

    render() {
        const {classes, item} = this.props;

        return (
            <Box className={classes.root}>
                {item.name}
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);