import React, {Component} from "react";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS,
    CONTENT_MOVE_ITEM,
    CONTENT_NEW_FOLDER,
    CONTENT_SHARE_LINK,
    CONTENT_SHOW_IMAGE,
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
import MoveItemDialog from "./content/MoveItemDialog";
import ShowImageDialog from "./content/ShowImageDialog";


const styles = () => ({
    root: {
        overflowY: "visible",
    },
});


class DriveDialog extends Component {


    constructor(props, context) {
        super(props, context);
        this.renderItemComponent = this.renderItemComponent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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
            case CONTENT_MOVE_ITEM:
                return <MoveItemDialog {...this.props}/>;
            case CONTENT_SHOW_IMAGE:
                return <ShowImageDialog {...this.props}/>;
            default:
                return <div>{this.props.dialogType}</div>;
        }
    }

    handleClose() {
        const {actions, folder, fetchSuccessResponse} = this.props;

        if (fetchSuccessResponse) {
            console.log("refreshing...");
            actions.folder.requestContent(folder.id);
        }
        actions.itemQueue.clear();
    }

    handleOpen(){
        const {actions, itemQueue, dialogItem} = this.props;
        actions.itemQueue.enqueue(itemQueue.filter((item) => item.id !== dialogItem.id).concat([dialogItem]));
    }

    render() {
        const {classes, isDialogOpen} = this.props;

        return (
            <Dialog fullWidth className={classes.root} open={isDialogOpen} onEnter={this.handleOpen} onExit={this.handleClose}
                    disableBackdropClick={true}>
                {this.renderItemComponent()}
            </Dialog>
        )
    }
}

export default withStyles(styles,{withTheme:false})(DriveDialog);