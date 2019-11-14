import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


class NewFolderDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.toggleInheritFlag = this.toggleInheritFlag.bind(this);
        this.state = {inherit : true};
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
            inheritPermissions : this.state.inherit
        };

        this.props.actions.createFolder(folder.id, body);
    }

    toggleInheritFlag(){
        this.setState({inherit : !this.state.inherit})
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
                        <FormControlLabel
                            control={<Checkbox checked={this.state.inherit} />}
                            disabled={isDialogFetching}
                            label="Inherit permissions from parent"
                            onChange={this.toggleInheritFlag}
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

