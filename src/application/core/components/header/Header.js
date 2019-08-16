import React, {Component} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Apps';
import {withStyles} from "@material-ui/styles";
import {drawerWidth} from "../navigation/Navigation";
import clsx from "clsx";


const styles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});


class Header extends Component {


    render() {
        const {classes, open} = this.props;

        return (
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        className={classes.menuButton}
                        onClick={this.props.openNavigation}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Medev Office {this.props.applicationTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles,{withTheme : true})(Header);