import React, {Component} from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {getThumbnailUrl} from "../../../actions/imageActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    root:{},
    content : {
        //maxWidth: 99 + "vw",
    },
    loader: {
    },
    image : {

        maxWidth: 100 + "%",
    }
});

class ShowImageDialog extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.props.actions.dialog.close();
    }

    render() {
        const {dialogItem,classes} = this.props;


        return (
            <React.Fragment>
                <DialogActions>
                    <IconButton onClick={this.handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
                <DialogContent className={classes.content}>
                    <img className={classes.image} alt={dialogItem.name} src={getThumbnailUrl(dialogItem)}/>
                </DialogContent>
            </React.Fragment>
        );
    }
}

export default withStyles(styles,{withTheme: false})(ShowImageDialog);