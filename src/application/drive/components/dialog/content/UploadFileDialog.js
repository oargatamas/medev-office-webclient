import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {fileTypes} from "../../../actions/fileTypeDictionary";
import FormGroup from "@material-ui/core/FormGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {textEllipsis} from "../../../../utils/stringUtils";


const renderItemStatus = (item) => {
    if (item.uploading) {
        return (<CircularProgress/>);
    }
    if (item.error) {
        return (<ErrorIcon color={"error"}/>);
    }
    if (item.success) {
        return (<CheckIcon color={"primary"}/>);
    }
    return <InsertDriveFileIcon color={"disabled"}/>;
};


class UploadFileDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.updateFileNames = this.updateFileNames.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleClose() {
        const {actions, uploadFinished} = this.props;
        if (uploadFinished) {
            actions.clearUploadList();
        }
        actions.closeItemDialog();
    }

    updateFileNames(e) {
        this.props.actions.enqueueFilesToUpload(e.target);
    }

    uploadFile() {
        const {folder, actions, itemsToUpload} = this.props;
        actions.uploadFiles(folder, itemsToUpload);
    }

    render() {
        const {isDialogFetching, itemsToUpload, uploadFinished} = this.props;

        return (
            <React.Fragment>
                <DialogTitle>Upload file</DialogTitle>
                <DialogContent>
                    <input
                        accept={fileTypes.map(item => "." + item.extension).join(",")}
                        style={{display: 'none'}}
                        id={"drive-raised-input-file"}
                        type="file"
                        multiple
                        onChange={this.updateFileNames}
                    />
                    <label htmlFor="drive-raised-input-file">
                        <Button fullWidth color="primary" variant="contained" component="span">
                            Browse
                        </Button>
                    </label>
                    <List>
                        {itemsToUpload.map(item => (
                            <ListItem key={item.filename}>
                                <ListItemAvatar>
                                    {renderItemStatus(item)}
                                </ListItemAvatar>
                                <ListItemText primary={textEllipsis(item.filename, 30)}
                                              secondary={textEllipsis(item.mimeType, 30)}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    {uploadFinished ? (
                        <Button color={"primary"} disabled={isDialogFetching} onClick={this.handleClose}>Close</Button>
                    ) : (
                        <Button color={"primary"} disabled={isDialogFetching} onClick={this.uploadFile}>Upload</Button>
                    )}
                    <Button color={"default"} disabled={isDialogFetching} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;