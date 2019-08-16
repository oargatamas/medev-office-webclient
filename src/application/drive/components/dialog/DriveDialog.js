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
        this.refreshFolder = this.refreshFolder.bind(this);
    }

    renderItemComponent() {
        switch (this.props.dialogType) {
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

    refreshFolder() {
        const {actions, folder, fetchSuccessResponse} = this.props;

        if(fetchSuccessResponse){
            console.log("refreshing...");
            actions.requestFolderContent(folder.id);
        }
    }

    render() {
        const {isDialogOpen} = this.props;

        return (
            <Dialog open={isDialogOpen} onExit={this.refreshFolder} disableBackdropClick={true}>
                {this.renderItemComponent()}
            </Dialog>
        )
    }
}

export default DriveDialog;