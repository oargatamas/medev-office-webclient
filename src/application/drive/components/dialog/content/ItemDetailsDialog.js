import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/styles/withStyles";


const styles = (theme) => ({
    content:{
        display: "flex",
        flexDirection: "column",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

class ItemDetailsDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleItemSave = this.handleItemSave.bind(this);
        this.state = {
            item: this.props.dialogItem
        };
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    handleItemSave() {
        const {actions, dialogItem} = this.props;
        const {item} = this.state;

        if (item !== dialogItem) {
            actions.saveItem(item);
        } else {
            actions.closeItemDialog();
        }
    }

    handleChange(field){
        const {item} = this.state;
        return function(e){
            this.setState({ ...item, [field]: e.target.value });
        };
    }

    render() {
        const {classes, dialogItem} = this.props;

        console.log(dialogItem);

        const creationDate = new Date(dialogItem.createdAt*1000);
        const updateDate = new Date(dialogItem.updatedAt*1000);

        return (
            <React.Fragment>
                <DialogTitle>Item details</DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField
                        id="name"
                        label="Name"
                        value={dialogItem.name}
                        className={classes.textField}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    {dialogItem.type === "file" ? ( <TextField
                        id="mimeType"
                        label="File type"
                        value={dialogItem.mimeType}
                        className={classes.textField}
                        onChange={this.handleChange('mimeType')}
                        margin="normal"
                    />) : (null)}

                    <TextField
                        id="author"
                        label="Author"
                        value={dialogItem.author}
                        className={classes.textField}
                        disabled={true}
                        margin="normal"
                    />
                    <TextField
                        id="createdAt"
                        label="Created"
                        className={classes.textField}
                        value={creationDate}
                        disabled={true}
                        margin="normal"
                    />
                    <TextField
                        id="updatedAt"
                        label="Updated"
                        className={classes.textField}
                        value={updateDate} // Todo add format!
                        disabled={true}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} onClick={this.handleItemSave}>Save</Button>
                    <Button color={"default"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withStyles(styles,{withTheme:true})(ItemDetailsDialog);