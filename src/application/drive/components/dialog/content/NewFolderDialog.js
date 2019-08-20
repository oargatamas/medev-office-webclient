import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";


class NewFolderDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.createFolder = this.createFolder.bind(this);
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    createFolder(e) {
        e.preventDefault();
        const {folder} = this.props;
        const form = e.target;

        const body = {
            folderName : form["folderName"].value,
        };

        this.props.actions.createFolder(folder.id, body);
    }

    render() {
        const {isDialogFetching} = this.props;


        return (
            <React.Fragment>
                <form onSubmit={this.createFolder}>
                    <DialogTitle>New folder</DialogTitle>
                    <DialogContent>
                        <TextField
                            disabled={isDialogFetching}
                            autoFocus
                            margin="dense"
                            id="folderName"
                            name="folderName"
                            label="Folder name"
                            type="text"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isDialogFetching} type="submit" color={"primary"}>Create</Button>
                        <Button  disabled={isDialogFetching} color={"default"} onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </React.Fragment>
        );
    }
}

export default NewFolderDialog;

