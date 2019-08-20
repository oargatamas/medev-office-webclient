import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";


const styles = (theme) => ({
    linkRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
    },
});

class ShareLinkDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.createItemLink = this.createItemLink.bind(this);
        this.copyLinkToClipboard = this.copyLinkToClipboard.bind(this);
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    createItemLink() {
        const {dialogItem} = this.props;
        return dialogItem.id;
    }

    copyLinkToClipboard(){
        const input = document.getElementById("drive-standard-copy-link");

        input.select();
        document.execCommand("copy");
        //Todo update tooltip with the text
    }

    render() {
        const {classes, dialogItem} = this.props;

        return (
            <React.Fragment>
                <DialogTitle>Share {dialogItem.name}</DialogTitle>
                <DialogContent>
                    <Typography>Copy this link to send to your partner.</Typography>
                    <div className={classes.linkRow}>
                        <TextField
                            id="drive-standard-copy-link"
                            label="Item link"
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={this.createItemLink()}
                        />
                        <IconButton color={"default"} onClick={this.copyLinkToClipboard}>
                            <FileCopyIcon/>
                        </IconButton>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} variant={"contained"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ShareLinkDialog);