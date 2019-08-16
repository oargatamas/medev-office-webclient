import React, {Component} from "react";
import {Box, Divider, IconButton, Link, Typography} from "@material-ui/core";
import {Link as RouteLink} from "react-router-dom";
import SubDirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import CreateFolderIcon from "@material-ui/icons/CreateNewFolder";
import UploadFileIcon from "@material-ui/icons/InsertDriveFile";
import {withStyles} from "@material-ui/styles";
import {CONTENT_NEW_FOLDER, CONTENT_UPLOAD_FILE} from "../../actions/dialogActions";


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


    constructor(props, context) {
        super(props, context);
        this.createFolderClick = this.createFolderClick.bind(this);
        this.uploadFileClick = this.uploadFileClick.bind(this);
    }

    createFolderClick(){
        this.props.actions.openItemDialog(CONTENT_NEW_FOLDER);
    }

    uploadFileClick(){
        this.props.actions.openItemDialog(CONTENT_UPLOAD_FILE);
    }

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
                    <IconButton onClick={this.createFolderClick}>
                        <CreateFolderIcon/>
                    </IconButton>
                    <IconButton onClick={this.uploadFileClick}>
                        <UploadFileIcon/>
                    </IconButton>
                </Box>
                <Divider/>
            </React.Fragment>
        );
    }
}


export default withStyles(styles, {withTheme: false})(DriveHeader);
