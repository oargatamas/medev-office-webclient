import React, {Component} from "react";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS,
    CONTENT_NEW_FOLDER,
    CONTENT_SHARE_LINK,
    CONTENT_UPLOAD_FILE
} from "../../actions/dialogActions";
import ItemDetailsDialog from "./content/ItemDetailsDialog";
import DeleteItemDialog from "./content/DeleteItemDialog";
import NewFolderDialog from "./content/NewFolderDialog";
import UploadFileDialog from "./content/UploadFileDialog";
import Dialog from "@material-ui/core/Dialog";
import ItemPermissionDialog from "./content/ItemPermissionDialog";
import ShareLinkDialog from "./content/ShareLinkDialog";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    root: {
        overflowY: "visible",
    },
});


class DriveDialog extends Component {


    constructor(props, context) {
        super(props, context);
        this.renderItemComponent = this.renderItemComponent.bind(this);
        this.refreshFolder = this.refreshFolder.bind(this);
    }

    renderItemComponent() {
        switch (this.props.dialogType) {
            case CONTENT_EDIT_DETAILS:
                return <ItemDetailsDialog {...this.props}/>;
            case CONTENT_EDIT_PERMISSIONS:
                return <ItemPermissionDialog {...this.props}/>;
            case CONTENT_DELETE_ITEM:
                return <DeleteItemDialog {...this.props}/>;
            case CONTENT_NEW_FOLDER:
                return <NewFolderDialog {...this.props}/>;
            case CONTENT_UPLOAD_FILE:
                return <UploadFileDialog {...this.props}/>;
            case CONTENT_SHARE_LINK:
                return <ShareLinkDialog {...this.props}/>;
            default:
                return <div>{this.props.dialogType}</div>;
        }
    }

    refreshFolder() {
        const {actions, folder, fetchSuccessResponse} = this.props;

        if (fetchSuccessResponse) {
            console.log("refreshing...");
            actions.requestFolderContent(folder.id);
        }
    }

    render() {
        const {classes, isDialogOpen} = this.props;

        return (
            <Dialog className={classes.root} open={isDialogOpen} onExit={this.refreshFolder}
                    disableBackdropClick={true}>
                {this.renderItemComponent()}
            </Dialog>
        )
    }
}

export default withStyles(styles,{withTheme:false})(DriveDialog);