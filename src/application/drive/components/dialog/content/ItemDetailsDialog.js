import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/styles/withStyles";
import moment from "moment";


const styles = (theme) => ({
    root:{},
    content:{
        display: "flex",
        flexDirection: "column",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        //width: 220,
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
        this.props.actions.dialog.close();
    }

    handleItemSave() {
        const {actions, dialogItem} = this.props;
        const {item} = this.state;

        if (item !== dialogItem) {
            actions.item.update(item);
        } else {
            actions.dialog.close();
        }
    }

    handleChange(field){
        const {item} = this.state;
        const component = this;
        return function(e){
            component.setState({item:{...item, [field]: e.target.value }});
        };
    }

    render() {
        const {classes, isDialogFetching, systemUsers} = this.props;
        const {item} = this.state;

        const creationDate = moment.unix(item.createdAt).format();
        const updateDate = moment.unix(item.updatedAt).format();

        const authorData = systemUsers.find(user => user.id.toString() === item.author.toString());

        return (
            <React.Fragment>
                <DialogTitle>Details of {item.name}</DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField
                        id="name"
                        label="Name"
                        value={item.name}
                        className={classes.textField}
                        disabled={isDialogFetching}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    {item.type === "file" ? ( <TextField
                        id="mimeType"
                        label="File type"
                        value={item.mimeType}
                        InputProps={{readOnly:true}}
                        disabled={isDialogFetching}
                        className={classes.textField}
                        onChange={this.handleChange('mimeType')}
                        margin="normal"
                    />) : (null)}

                    <TextField
                        id="author"
                        label="Author"
                        InputProps={{readOnly:true}}
                        disabled={isDialogFetching}
                        value={authorData.firstName + " " + authorData.lastName}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="createdAt"
                        label="Created"
                        InputProps={{readOnly:true}}
                        disabled={isDialogFetching}
                        className={classes.textField}
                        value={creationDate}
                        margin="normal"
                    />
                    <TextField
                        id="updatedAt"
                        label="Updated"
                        InputProps={{readOnly:true}}
                        disabled={isDialogFetching}
                        className={classes.textField}
                        value={updateDate}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDialogFetching} color={"primary"} onClick={this.handleItemSave}>Save</Button>
                    <Button disabled={isDialogFetching} color={"default"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withStyles(styles,{withTheme:true})(ItemDetailsDialog);