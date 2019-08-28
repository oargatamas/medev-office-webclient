import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


class DeleteItemDialog extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleClose(){
        this.props.actions.closeItemDialog();
    }

    handleDeleteClick(){
        const {dialogItem, actions} = this.props;
        actions.deleteItem(dialogItem.id, dialogItem.type);
    }

    render() {

        const {dialogItem, isDialogFetching} = this.props;

        console.log(dialogItem);

        return (
            <React.Fragment>
                <DialogTitle>Delete {dialogItem.type}</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete '{dialogItem.name}'?
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDialogFetching} color={"primary"} onClick={this.handleDeleteClick}>Delete</Button>
                    <Button disabled={isDialogFetching} color={"default"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default DeleteItemDialog;