import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    root: {
        flex: "0 0 auto"
    }
});

class NavigationBar extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>Navigation Bar</div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(NavigationBar);