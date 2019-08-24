import React, {Component} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Apps';
import {withStyles} from "@material-ui/styles";
import {drawerWidth} from "../navigation/Navigation";
import clsx from "clsx";
import {AccountCircle, Out} from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import ProfileCard from "../profile/ProfileCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";


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
    profileIcon: {
        marginLeft: "auto",
    },
    profileMenuContainer: {
        padding: theme.spacing(2),
    }
});


class Header extends Component {


    constructor(props, context) {
        super(props, context);
        this.handleToggleProfileMenu = this.handleToggleProfileMenu.bind(this);
        this.handleCloseProfileMenu = this.handleCloseProfileMenu.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            profileMenuOpen: false,
            menuAnchor: null,
        };
    }

    handleToggleProfileMenu(e) {
        this.setState({profileMenuOpen: !this.state.profileMenuOpen, menuAnchor: e.target})
    }

    handleCloseProfileMenu() {
        this.setState({profileMenuOpen: false, menuAnchor: null})
    }

    handleLogoutClick() {
        this.props.logout();
        this.handleCloseProfileMenu();
    }

    render() {
        const {classes, open, user} = this.props;
        const {profileMenuOpen, menuAnchor} = this.state;

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

                    <IconButton onClick={this.handleToggleProfileMenu} color={"inherit"}
                                className={classes.profileIcon}>
                        <AccountCircle/>
                    </IconButton>

                    <Popover
                        open={profileMenuOpen}
                        anchorEl={menuAnchor}
                        onClose={this.handleCloseProfileMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Paper className={classes.profileMenuContainer}>
                            <ProfileCard user={user}/>
                            <Divider/>
                            <List dense={true}>
                                <ListItem button onClick={this.handleLogoutClick}>
                                    <ListItemText>Sign out</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Popover>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Header);