import React, {Component} from "react";
import DialogTitle from "./UploadFileDialog";


class QueueOperationDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClose() {
        const {actions, itemQueueFinished} = this.props;
        if (itemQueueFinished) {
            actions.itemQueue.clear();
        }
        actions.dialog.close();
    }

    render() {
        const {title} = this.props;

        return (
            <React.Fragment>
                <DialogTitle>{title}</DialogTitle>

            </React.Fragment>
        );
    }
}