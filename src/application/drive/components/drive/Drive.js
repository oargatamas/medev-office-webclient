import React, {Component} from "react";
import {Divider, withStyles} from "@material-ui/core";
import NavigationBar from "../navigation/NavigationBar";
import DriveHeader from "../header/DriveHeader";
import DriveItemContainer from "../items/container/DriveItemContainer";
import DriveHeaderSkeleton from "../header/DriveHeaderSkeleton";
import NavigationBarSkeleton from "../navigation/NavigationBarSkeleton";
import DriveItemContainerSkeleton from "../items/container/DriveItemContainerSkeleton";


const styles = () => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    }
});


class Drive extends Component {


    componentDidMount() {
        this.props.requestRootFolder();
    }

    render() {
        const {classes, isFetching} = this.props;

        return (
            <div className={classes.root}>
                {(isFetching) ? (
                    <React.Fragment>
                        <NavigationBarSkeleton/>
                        <DriveHeaderSkeleton/>
                        <Divider/>
                        <DriveItemContainerSkeleton/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavigationBar/>
                        <DriveHeader/>
                        <Divider/>
                        <DriveItemContainer/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);