import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Box, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
    },
    itemIcon : {
        width: 100,
        height: 100,
    }
});

class DriveItem extends Component {

    renderItemIcon(){
        const {classes, item} = this.props;

        if(item.type === "folder"){
            return (
                <Link to={"/drive/"+item.id}>
                    <FolderIcon color="primary" className={classes.itemIcon}/>
                </Link>
            );
        }
        return null;
    }

    render() {
        const {classes, item, key} = this.props;

        return (
            <Box key={key} className={classes.root}>
                {this.renderItemIcon()}
                <Typography variant={"subtitle1"}>
                {item.name}
                </Typography>
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);