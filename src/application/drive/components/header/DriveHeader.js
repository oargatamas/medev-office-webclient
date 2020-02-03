import React, {Component} from "react";
import {Box, Divider, Grid, IconButton, Link, Typography} from "@material-ui/core";
import {Link as RouteLink} from "react-router-dom";
import SubDirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import CreateFolderIcon from "@material-ui/icons/CreateNewFolder";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RefreshIcon from "@material-ui/icons/Refresh";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CheckboxIcon from "@material-ui/icons/CheckBox";
import UnCheckboxIcon from "@material-ui/icons/IndeterminateCheckBox";
import EditIcon from "@material-ui/icons/Edit";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {withStyles} from "@material-ui/styles";
import {
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS,
    CONTENT_NEW_FOLDER,
    CONTENT_UPLOAD_FILE
} from "../../actions/dialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import {API_ORIGIN} from "../../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "../../actions/driveApi";


const styles = (theme) => ({
    root: {
        flex: "0 0",
    },
    button: {
        transform: "rotate(90deg)",
        marginRight: theme.spacing(1),
    },
    buttonGroup: {
        marginRight: theme.spacing(3),
    },
    folderTitle: {
        wordWrap: "break-word",
    }
});


class DriveHeader extends Component {


    constructor(props, context) {
        super(props, context);
        this.createFolderClick = this.createFolderClick.bind(this);
        this.uploadFileClick = this.uploadFileClick.bind(this);
        this.refreshFolderClick = this.refreshFolderClick.bind(this);
        this.editPermissionsClick = this.editPermissionsClick.bind(this);
        this.editItemClick = this.editItemClick.bind(this);
        this.toggleChecks = this.toggleChecks.bind(this);
    }

    createFolderClick() {
        this.props.actions.dialog.open(CONTENT_NEW_FOLDER);
    }

    uploadFileClick() {
        this.props.actions.dialog.open(CONTENT_UPLOAD_FILE);
    }

    refreshFolderClick() {
        const {folder} = this.props;
        this.props.actions.folder.requestContent(folder.id);
    }

    editPermissionsClick() {
        const {folder} = this.props;
        this.props.actions.dialog.open(CONTENT_EDIT_PERMISSIONS, folder);
    }

    editItemClick() {
        const {folder} = this.props;
        this.props.actions.dialog.open(CONTENT_EDIT_DETAILS, folder);
    }

    toggleChecks() {
        const {actions, itemQueue, items} = this.props;

        if (itemQueue.length > 0) {
            actions.itemQueue.clear();
        } else {
            actions.itemQueue.enqueue(items);
        }
    }


    render() {
        const {classes, itemQueue, folder, parent} = this.props;

        return (
            <React.Fragment>
                <Box className={classes.root}>
                    <Typography className={classes.folderTitle} variant={"h4"}
                                color={"primary"}>{folder.name}</Typography>

                    <Grid container>
                        <span className={classes.buttonGroup}>
                        <Tooltip title="Go to parent folder" placement="bottom">
                        <IconButton className={classes.button}>
                            {(parent) ? (
                                <Link component={RouteLink} to={"/drive/" + parent.id}>
                                    <SubDirectoryArrowLeftIcon/>
                                </Link>
                            ) : (
                                <SubDirectoryArrowLeftIcon/>
                            )}
                        </IconButton>
                    </Tooltip>
                        </span>

                        <span className={classes.buttonGroup}>
                        <Tooltip title="Check or clear all items" placement="bottom">
                        <IconButton onClick={this.toggleChecks}>
                            {(itemQueue.length > 0) ? (
                                <CheckboxIcon/>
                            ) : (
                                <UnCheckboxIcon/>
                            )}
                        </IconButton>
                        </Tooltip>
                    </span>

                        <span className={classes.buttonGroup}>
                        <Tooltip title="Refresh folder" placement="bottom">
                        <IconButton onClick={this.refreshFolderClick}>
                            <RefreshIcon/>
                        </IconButton>
                        </Tooltip>
                          <Tooltip title="Create folder" placement="bottom">
                        <IconButton onClick={this.createFolderClick}>
                            <CreateFolderIcon/>
                        </IconButton>
                          </Tooltip>
                                <Tooltip title="Upload file" placement="bottom">
                        <IconButton onClick={this.uploadFileClick}>
                            <CloudUploadIcon/>
                        </IconButton>
                                </Tooltip>
                    </span>
                        <span className={classes.buttonGroup}>
                        <Tooltip title="Edit folder properties" placement="bottom">
                            <IconButton onClick={this.editItemClick}>
                                <EditIcon/>
                            </IconButton>
                            </Tooltip>
                        <Tooltip title="Edit folder permissions" placement="bottom">
                            <IconButton onClick={this.editPermissionsClick}>
                                <ListAltIcon/>
                            </IconButton>
                            </Tooltip>
                    </span>

                        <span className={classes.buttonGroup}>
                        <Tooltip title="Download folder content" placement="bottom">
                            <IconButton>
                                <Link color={"inherit"} target={"_blank"}
                                      href={API_ORIGIN + DRIVE_API_BASE + "/folder/" + folder.id + "/data"}>
                                <CloudDownloadIcon/>
                                </Link>
                            </IconButton>
                            </Tooltip>
                    </span>
                    </Grid>
                </Box>
                <Divider/>
            </React.Fragment>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveHeader);
