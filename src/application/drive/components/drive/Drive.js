import React, {Component} from "react";
import {LinearProgress, withStyles} from "@material-ui/core";
import NavigationBar from "../navigation/NavigationBar";
import DriveHeader from "../header/DriveHeader";
import DriveHeaderSkeleton from "../header/DriveHeaderSkeleton";
import NavigationBarSkeleton from "../navigation/NavigationBarSkeleton";
import DriveItemContainer from "../items/container/DriveItemContainer";

const styles = () => ({
    root: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    }
});


class Drive extends Component {


    componentDidMount() {
        this.props.actions.requestRootFolder();

    }

    render() {
        const {classes, isFetching, rootFolder, items, navigation} = this.props;

        return (
            <div className={classes.root}>
                {(isFetching) ? (
                    <React.Fragment>
                        <NavigationBarSkeleton/>
                        <DriveHeaderSkeleton/>
                        <LinearProgress color={"primary"}/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavigationBar items={navigation}/>
                        <DriveHeader folder={rootFolder}/>
                        <DriveItemContainer items={items}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);