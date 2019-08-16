import React, {Component} from "react";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_NEW_FOLDER,
    CONTENT_SHOW_DETAILS,
    CONTENT_UPLOAD_FILE
} from "../../actions/dialogActions";
import ItemDetailsDialog from "./content/ItemDetailsDialog";
import DeleteItemDialog from "./content/DeleteItemDialog";
import NewFolderDialog from "./content/NewFolderDialog";
import UploadFileDialog from "./content/UploadFileDialog";
import Dialog from "@material-ui/core/Dialog";

class DriveDialog extends Component {


    constructor(props, context) {
        super(props, context);
        this.renderItemComponent = this.renderItemComponent.bind(this);
    }

    renderItemComponent() {
        switch (this.props.content) {
            case CONTENT_SHOW_DETAILS:
                return <ItemDetailsDialog {...this.props}/>;
            case CONTENT_EDIT_DETAILS:
                return <ItemDetailsDialog {...this.props}/>;
            case CONTENT_DELETE_ITEM:
                return <DeleteItemDialog {...this.props}/>;
            case CONTENT_NEW_FOLDER:
                return <NewFolderDialog {...this.props}/>;
            case CONTENT_UPLOAD_FILE:
                return <UploadFileDialog {...this.props}/>;
            default:
                return <div/>;
        }
    }

    render() {
        const {open} = this.props;

        return (
            <Dialog open={open} disableBackdropClick={true}>
                {this.renderItemComponent()}
            </Dialog>
        )
    }
}

export default DriveDialog;