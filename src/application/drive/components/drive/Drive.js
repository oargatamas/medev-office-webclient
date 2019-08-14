import React, {Component} from "react";
import {Divider, LinearProgress, withStyles} from "@material-ui/core";
import NavigationBar from "../navigation/NavigationBar";
import DriveHeader from "../header/DriveHeader";
import DriveItemContainer from "../items/container/DriveItemContainer";
import DriveHeaderSkeleton from "../header/DriveHeaderSkeleton";
import NavigationBarSkeleton from "../navigation/NavigationBarSkeleton";

const styles = () => ({
    root: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    }
});


class Drive extends Component {


    componentDidMount() {
        this.props.requestRootFolder();

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
                        <Divider/>
                        <DriveItemContainer items={items}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);