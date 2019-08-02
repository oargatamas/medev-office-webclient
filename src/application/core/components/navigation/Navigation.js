import React, {Component} from "react";
import {Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/Inbox";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";

export const drawerWidth = 240;

const styles = (theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class Navigation extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {classes, open} = this.props;

        return (
            <Drawer
                variant="permanent"
                open={open}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.closeNavigation}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>

                <Divider/>


                <List>
                    <ListItem button key={"1"}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"semmi sem"}/>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Navigation);