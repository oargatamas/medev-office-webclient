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




    componentDidMount(){
        console.log("componentDidMount()");
        const {actions, match} = this.props;

        if(match.params.id){
            console.log("van id");
            actions.requestFolderContent(match.params.id);
        }else{
            console.log("nincs id");
            actions.requestRootFolder();
        }
    }


    render() {
        const {classes, isFetching, rootFolder, items, navigation, actions} = this.props;

        console.log("fut a render!");
        console.log(this.props.match);

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
                        <DriveHeader parent={navigation.slice(-1)[0]} folder={rootFolder} actions={actions}/>
                        <DriveItemContainer items={items} actions={actions}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: false})(Drive);