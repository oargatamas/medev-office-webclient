import React, {Component} from "react";
import {AppBar,Toolbar,IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component{

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;