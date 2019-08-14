import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {DashBoardModule} from "../../../dashboard/App";
import {DriveModule} from "../../../drive/App";

const styles = (theme) => ({
    content: {
        display:"flex",
        flexDirection:"column",
        height:"100vh",
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

const moduleRootComponents = {
    dashboard: <DashBoardModule key={"dashboard"}/>,
    drive: <DriveModule key={"drive"}/>
};

class ModuleContainer extends Component {


    render() {
        const {classes, modules} = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {modules.map((item) => moduleRootComponents[item.name])}
            </main>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ModuleContainer);