import React, {Component} from "react";
import {Dialog} from "@material-ui/core";


class DriveDialog extends Component {

    renderContent() {
        const {content} = this.props;

        switch (content) {
            default: return null;
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