import React, {Component} from "react";
import {LinearProgress, withStyles} from "@material-ui/core";
import NavigationBar from "../navigation/NavigationBar";
import DriveHeader from "../header/DriveHeader";
import DriveHeaderSkeleton from "../header/DriveHeaderSkeleton";
import NavigationBarSkeleton from "../navigation/NavigationBarSkeleton";
import DriveItemContainer from "../items/container/DriveItemContainer";
import DriveDialog from "../dialog/DriveDialog";

const styles = () => ({
    root: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    }
});


class Drive extends Component {




    componentDidMount(){
        const {actions, match, rootFolder} = this.props;

        console.log("drive component mount");
        actions.changeAppTitle();
        if(match.params.id){
            console.log("getting content with id");
            actions.folder.requestContent(match.params.id);
        }

        if(Object.keys(rootFolder).length === 0){
            console.log("getting root directory");
            actions.folder.requestRoot();
        }
    }


    render() {
        const {classes, isFetching, items, navigation, actions, itemQueue} = this.props;

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
                        <NavigationBar items={navigation} actions={actions}/>
                        <DriveHeader parent={navigation.slice(-1)[0]} {...this.props}/>
                        <DriveItemContainer items={items} selectedItems={itemQueue} actions={actions}/>
                        <DriveDialog {...this.props}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);