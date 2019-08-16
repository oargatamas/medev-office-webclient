import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";


class UploadFileDialog extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.props.actions.closeItemDialog();
    }

    render() {
        return(
            <React.Fragment>
                <DialogTitle>Upload file</DialogTitle>
                <DialogActions>
                    <Button color={"primary"} variant={"contained"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}


export default UploadFileDialog;