import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {fileTypes} from "../../../actions/fileTypeDictionary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {textEllipsis} from "../../../../utils/stringUtils";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {enqueueFilesToUpload} from "../../../actions/itemUploadActions";


const renderItemStatus = (item) => {
    if (item.fetching) {
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
        this.uploadFiles = this.uploadFiles.bind(this);
        this.uploadFailedFiles = this.uploadFailedFiles.bind(this);
        this.toggleInheritFlag = this.toggleInheritFlag.bind(this);
        this.state = {inherit : true};
    }

    handleClose() {
        const {actions, itemQueueFinished} = this.props;
        if (itemQueueFinished) {
            actions.itemQueue.clear();
        }
        actions.dialog.close();
    }

    updateFileNames(e) {
        const {folder, actions} = this.props;
        const {inherit} = this.state;

        actions.itemQueue.enqueue(enqueueFilesToUpload(e.target,folder.id, inherit));
    }

    uploadFiles() {
        const {actions, itemQueue} = this.props;
        actions.itemQueue.process.toUpload(itemQueue);
    }

    uploadFailedFiles() {
        const {actions, itemQueue} = this.props;
        actions.itemQueue.process.toUpload(itemQueue.filter(item => item.error));
    }

    toggleInheritFlag(){
        this.setState({inherit : !this.state.inherit})
    }

    render() {
        const {isDialogFetching, itemQueue, dialogItem, itemQueueFinished} = this.props;

        const hasError = itemQueue.filter(item => item.error).length > 0;

        return (
            <React.Fragment>
                <DialogTitle>Upload file(s) {dialogItem.name}</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        disabled={isDialogFetching}
                        control={<Checkbox checked={this.state.inherit} />}
                        label="Inherit permissions from parent"
                        onChange={this.toggleInheritFlag}
                    />
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
                        {itemQueue.map(item => (
                            <ListItem key={item.file.name}>
                                <ListItemAvatar>
                                    {renderItemStatus(item)}
                                </ListItemAvatar>
                                <ListItemText primary={item.file.name}
                                              secondary={textEllipsis(item.mimeType, 20)}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </DialogContent>
                <DialogActions>
                    {itemQueueFinished ? (
                            hasError ? (
                                <Button color={"secondary"} disabled={isDialogFetching} onClick={this.uploadFailedFiles}>Retry</Button>
                            ) : (
                                <Button color={"primary"} disabled={isDialogFetching} onClick={this.handleClose}>Close</Button>
                            )
                        ) :
                        hasError ? (
                            <Button color={"secondary"} disabled={isDialogFetching} onClick={this.uploadFailedFiles}>Retry</Button>
                        ) : (
                            <Button color={"primary"} disabled={isDialogFetching} onClick={this.uploadFiles}>Upload</Button>
                        )
                    }

                    <Button color={"default"} disabled={isDialogFetching} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;