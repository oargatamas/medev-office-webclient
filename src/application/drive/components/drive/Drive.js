import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import NavigationBar from "../navigation/NavigationBar";
import DriveHeader from "../header/DriveHeader";
import DriveItemContainer from "../items/container/DriveItemContainer";


const styles = (theme) => ({
    root: {
        display : "flex",
        flexDirection : "column"
    }
});



class Drive extends Component{


    componentDidMount() {
        this.props.requestRootFolder();
    }

    render() {
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <NavigationBar/>
                <DriveHeader/>
                <DriveItemContainer/>
            </div>
        );
    }
}


export default withStyles(styles,{withTheme:true})(Drive);