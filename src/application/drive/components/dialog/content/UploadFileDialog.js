import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";


class UploadFileDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.updateFileName = this.updateFileName.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    updateFileName(e) {
        console.log(e.target);
        document.getElementById("driveUploadFileNameLabel").value = e.target.files[0].name;
    }

    uploadFile() {
        const {folder, actions} = this.props;
        const fileInput = document.getElementById("drive-raised-button-file");
        actions.uploadFile(folder, fileInput);
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle>Upload file</DialogTitle>
                <DialogContent>
                    <input
                        accept="*/*"
                        style={{display: 'none'}}
                        id="drive-raised-button-file"
                        multiple
                        type="file"
                        onChange={this.updateFileName}
                    />
                    <TextField inputProps={{id: "driveUploadFileNameLabel", readOnly: true}}/>
                    <label htmlFor="drive-raised-button-file">
                        <Button variant="raised" component="span">
                            Browse
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} onClick={this.uploadFile}>Upload</Button>
                    <Button color={"default"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;