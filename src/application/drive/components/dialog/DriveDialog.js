import React, {Component} from "react";
import {Dialog} from "@material-ui/core";
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


class DriveDialog extends Component {

    renderContent() {
        const {content} = this.props;

        switch (content) {
            case CONTENT_SHOW_DETAILS:
                return <ItemDetailsDialog/>;
            case CONTENT_EDIT_DETAILS:
                return <ItemDetailsDialog/>;
            case CONTENT_DELETE_ITEM:
                return <DeleteItemDialog/>;
            case CONTENT_NEW_FOLDER:
                return <NewFolderDialog/>;
            case CONTENT_UPLOAD_FILE:
                return <UploadFileDialog/>;
            default:
                return null;
        }
    }

    render() {
        const {open} = this.props;

        return (
            <Dialog open={open}>
                {this.renderContent()}
            </Dialog>
        );
    }
}

export default DriveDialog;