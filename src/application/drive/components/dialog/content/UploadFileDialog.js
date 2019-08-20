import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";


class UploadFileDialog extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.updateFileName = this.updateFileName.bind(this);
    }

    handleClose(){
        this.props.actions.closeItemDialog();
    }

    updateFileName(e) {
        console.log(e.target);
        document.getElementById("driveUploadFileNameLabel").value = e.target.files[0].name;
    }


    render() {
        return(
            <React.Fragment>
                <DialogTitle>Upload file</DialogTitle>
                <DialogContent>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={this.updateFileName}
                    />
                    <TextField inputProps={{id:"driveUploadFileNameLabel"}} ></TextField>
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                            Upload
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} variant={"contained"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;