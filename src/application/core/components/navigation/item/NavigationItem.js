import React, {Component} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {withStyles} from "@material-ui/styles";


const styles = (theme) => (
    {
        drawerItem: {
            color:theme.palette.text.primary,
            textDecoration: "none"
        }
    }
);

class NavigationItem extends Component {

    render() {
        const {classes, route, text, icon, onClick} = this.props;

        return (
            <NavLink className={classes.drawerItem} to={route}>
                <ListItem button onClick={onClick}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            </NavLink>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NavigationItem);