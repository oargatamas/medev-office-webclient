import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {fileTypes} from "./fileTypeDictionary";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";


class UploadFileDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.updateFileName = this.updateFileName.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.state = {
            filename: "",
            mimeType: "",
        };
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    updateFileName(e) {
        console.log(e.target);
        const filename = e.target.files[0].name;
        const extension = filename.split(".").pop();

        this.setState({
            filename: filename,
            mimeType: fileTypes.find(item => item.extension === extension).mimeType
        });
    }

    uploadFile() {
        const {folder, actions} = this.props;
        const fileInput = document.getElementById("drive-raised-input-file");
        actions.uploadFile(folder, fileInput);
    }

    render() {
        const {isDialogFetching} = this.props;
        const {filename, mimeType} = this.state;

        return (
            <React.Fragment>
                <DialogTitle>Upload file</DialogTitle>
                <DialogContent>
                    <input
                        accept={fileTypes.map(item => "." + item.extension).join(",")}
                        style={{display: 'none'}}
                        id="drive-raised-input-file"
                        type="file"
                        onChange={this.updateFileName}
                    />
                    <FormGroup row>
                        <TextField inputProps={{readOnly: true}} value={filename}/>
                        <label htmlFor="drive-raised-input-file">
                            <Button variant="raised" component="span">
                                Browse
                            </Button>
                        </label>
                    </FormGroup>
                    <Typography variant={"body1"}>{mimeType}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} disabled={isDialogFetching} onClick={this.uploadFile}>Upload</Button>
                    <Button color={"default"} disabled={isDialogFetching} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;