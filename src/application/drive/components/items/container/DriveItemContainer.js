import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import DriveItem from "../DriveItem";


const styles = () => ({
    root: {
        flex: "1 1 auto",
        height: "100%",
        overflow:"auto",
    },
    content: {
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    }
});

class DriveItemContainer extends Component {
    render() {

        const {classes, items} = this.props;

        return (
            <Box className={classes.root}>
                <Box className={classes.content}>
                    {items.map((item) => (<DriveItem item={item}/>))}
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles, {withTheme: false})(DriveItemContainer);