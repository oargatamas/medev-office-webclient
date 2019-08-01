import React, {Component} from "react";
import {AppBar, Toolbar, IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
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

    constructor(props, context) {
        super(props, context);
        this.state = {
            open : true
        }
    }


    render() {
        const {classes} = this.props;

        let open = this.state.open;

        return (
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton edge="start" color="inherit" className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles,{withTheme : true})(Header);