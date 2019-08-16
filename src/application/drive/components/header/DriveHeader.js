import React, {Component} from "react";
import {Box, Divider, IconButton, Link, Typography} from "@material-ui/core";
import {Link as RouteLink} from "react-router-dom";
import SubDirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import CreateFolderIcon from "@material-ui/icons/CreateNewFolder";
import UploadFileIcon from "@material-ui/icons/InsertDriveFile";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    root: {
        flex: "0 0 auto",
    },
    button:{
        transform: "rotate(90deg)",
        marginRight : 10,
    }
});


class DriveHeader extends Component {

    render() {
        const {classes, folder, parent} = this.props;

        return (
            <React.Fragment>
                <Box className={classes.root}>
                    <Typography variant={"h4"} color={"primary"}>{folder.name}</Typography>
                    <IconButton className={classes.button}>
                        {(parent) ? (
                            <Link component={RouteLink} to={"/drive/"+parent.id}>
                                <SubDirectoryArrowLeftIcon />
                            </Link>
                        ) : (
                            <SubDirectoryArrowLeftIcon />
                        )}
                    </IconButton>
                    <IconButton>
                        <CreateFolderIcon/>
                    </IconButton>
                    <IconButton>
                        <UploadFileIcon/>
                    </IconButton>
                </Box>
                <Divider/>
            </React.Fragment>
        );
    }
}


export default withStyles(styles, {withTheme: false})(DriveHeader);
