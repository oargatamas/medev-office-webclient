import React, {Component} from "react";
import {Divider, Drawer, IconButton, List} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloudIcon from "@material-ui/icons/Cloud";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import NavigationItem from "./item/NavigationItem";
import DashboardIcon from '@material-ui/icons/Dashboard';


const moduleIcons = {
    "dashboard" : <DashboardIcon/>,
    "drive" : <CloudIcon/>
};


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

    render() {
        let {classes, open, modules, closeNavigation} = this.props;

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
                    {modules.map((item) => (
                            <NavigationItem
                                key={item.name}
                                route={"/" + item.name}
                                text={item.name}
                                icon={moduleIcons[item.name]}
                                onClick={closeNavigation}
                            />
                        )
                    )}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Navigation);