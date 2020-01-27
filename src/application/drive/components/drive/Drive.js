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
        const {actions, match} = this.props;

        actions.changeAppTitle();

        if(match.params.id){
            actions.folder.requestContent(match.params.id);
        }else{
            actions.folder.requestRoot();
        }
    }


    render() {
        const {classes, isFetching, folder, items, navigation, actions, itemQueue} = this.props;

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
                        <DriveHeader parent={navigation.slice(-1)[0]} folder={folder} actions={actions}/>
                        <DriveItemContainer items={items} selectedItems={itemQueue} actions={actions}/>
                        <DriveDialog {...this.props}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);